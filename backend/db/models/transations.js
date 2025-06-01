const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Account = require('./accounts');
const Category = require('./categories');
const dbConnector = require('../dbconnector');
const User = require('./users');

const fields = {};
fields['id'] = { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true };
fields['user_id'] = {
    type: DataTypes.BIGINT, allowNull: false, references: {
        model: User,
        key: 'id',
    }
};
fields['account_id'] = {
    type: DataTypes.BIGINT, allowNull: false, references: {
        model: Account,
        key: 'id',
    }
};
fields['category_id'] = {
    type: DataTypes.BIGINT, allowNull: false, references: {
        model: Category,
        key: 'id'
    }
};
fields['transaction_type'] = { type: DataTypes.ENUM('income', 'expense'), allowNull: false };
fields['amount'] = { type: DataTypes.DECIMAL(15, 2), allowNull: false };
fields['description'] = { type: DataTypes.TEXT, allowNull: true };

const indexes = [
    { fields: ['account_id'] },
    { fields: ['category_id'] }
]

module.exports = dbConnector.define('transactions', fields, { indexes, freezeTableName: true });