const sequelize = require('sequelize');
const Category = require('../db/models/categories');
const Transaction = require('../db/models/transactions');
const { fn, col } = sequelize;
const Op = sequelize.Op;

exports.getThisMonthAnalysis = async (req, res) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const startOfNextMonth = new Date(startOfMonth);
    startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

    try {
        const userId = req.user.id;
        const categoryType = req.body.category_type;

        const result = await Category.findAll({
            where: {
                user_id: userId,
                category_type: categoryType
            },
            attributes: [
                ['category_name', 'category'],
                [fn('SUM', col('transactions.amount')), 'totalSpent']
            ],
            include: [
                {
                    model: Transaction,
                    attributes: [],
                    where: {
                        createdAt: {
                            [Op.gte]: startOfMonth,
                            [Op.lt]: startOfNextMonth
                        }
                    }
                }
            ],
            group: ['categories.id'],
            raw: true
        });

        const results = result.map(row => ({
            ...row,
            totalSpent: parseFloat(row.totalSpent) || 0
        }));

        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error in fetching data");
    }
};
