const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
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
fields['account_name'] = { type: DataTypes.STRING(100), allowNull: false };
fields['balance'] = { type: DataTypes.DECIMAL(15, 2), allowNull: true };

const indexes = [
  { fields: ['user_id'] }
];

module.exports = dbConnector.define('accounts', fields, { indexes, freezeTableName: true })
