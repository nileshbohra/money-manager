const Category = require('../db/models/categories');

const getAllCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        let categoryList = await Category.findAll({
            where: {
                user_id: userId
            }
        })

        res.status(200).json(categoryList)
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Error fetching categories' });
    }
}

const addCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        let { categoryName, categoryType } = req.body;
        categoryType = !!categoryType.income ? 'income' : 'expense'
        if (!categoryName || !categoryType) {
            return res.status(400).json({ message: 'Name and type are required' });
        }

        const newCategory = await Category.create({ user_id: userId, category_name: categoryName, category_type: categoryType });
        res.status(201).json({
            id: newCategory.id,
            name: newCategory.category_name,
            type: newCategory.category_type
        });
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ message: 'Error adding category' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        let { id, categoryName, categoryType } = req.body;
        categoryType = !!categoryType.income ? 'income' : 'expense'
        const [updated] = await Category.update(
            { category_name: categoryName, category_type: categoryType },
            { where: { user_id: userId, id } }
        );

        if (updated) {
            const updatedCategory = await Category.findOne({ where: { user_id: userId, id } });
            res.status(200).json({
                id: updatedCategory.id,
                name: updatedCategory.category_name,
                type: updatedCategory.category_type
            });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ message: 'Error updating category' });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;

        const deleted = await Category.destroy({
            where: {
                user_id: userId,
                id: id
            }
        })
        if (!!deleted) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: 'Error deleting category' });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}