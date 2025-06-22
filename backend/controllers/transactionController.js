const Category = require('../db/models/categories');
const Transaction = require('../db/models/transactions');
const Account = require('../db/models/accounts');

const getAllTransactions = async (req, res) => {
    try {
        const user_id = req.user.id;
        const transactionList = await Transaction.findAll({
            where: { user_id: user_id }
        });

        res.status(200).json({
            success: true,
            data: transactionList
        })
    } catch (err) {
        console.error('Error fetching Transactions:', err);
        res.status(500).json({ message: 'Error fetching Transacions' });
    }
}

const addTransaction = async (req, res) => {
    try {
        let { transactionType, amount, categoryID, description, accountID } = req.body;
        const userId = req.user.id;

        transactionType = !!transactionType.income ? "income" : "expense";
        const category = await Category.findOne({
            where: {
                user_id: userId,
                id: categoryID
            }
        })

        if (!category)
            return res.status(404).json({ error: "category Not Found" })


        const account = await Account.findOne({
            where: {
                id: accountID,
                user_id: userId
            }
        });

        if (!account)
            return res.status(404).json({ error: "Account Not Found" })
        else {
            if (transactionType === "income") {
                account.balance = account.balance + amount;
                await account.save();
            } else {
                account.balance = account.balance - amount;
                await account.save();
            }
        }

        const newTransaction = await Transaction.create({
            user_id: userId,
            account_id: accountID,
            category_id: categoryID,
            description: description,
            transaction_type: transactionType,
            amount: amount
        })

        if (!newTransaction)
            return res.status(400).json({ error: "Error adding Transaction" })



        let obj = {
            id: newTransaction.dataValues.id,
            amount: newTransaction.dataValues.amount,
            transactionType: newTransaction.dataValues.transaction_type,
            description: newTransaction.dataValues.description
        }
        return res.status(200).json({ success: true, data: { ...obj, category: category.dataValues } });
    } catch (err) {
        console.error('Error adding Transaction:', err.message);
        res.status(500).json({ message: 'Error adding Transaction' });
    }
}


const editTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, amount, type, category_id } = req.body;

        const transaction = await Transaction.findOne({
            where: {
                user_id: userId,
                id: id
            }
        })

        if (!transaction)
            return res.send("Transaction not found")

        const updatedTransaction = await Transaction.update({
            what: {
                amount: amount,
                transaction_type: type,
                category_id: category_id
            }
        })

        console.log(updatedTransaction);

        res.status(200).json({
            updatedTransaction
        })

    } catch (err) {
        console.error(err)
        res.send("Error in Updating Transaction")
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;
        const deleted = Transaction.destroy({
            where: {
                user_id: userId,
                id: id
            }
        })
        if (!!deleted) {
            res.status(200).json({ message: "Transaction deleted Successfully" })
        }
        else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: 'Error deleting Transaction' });
    }
}

module.exports = {
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
}