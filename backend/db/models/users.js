const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const dbConnector = require('../dbconnector')

const fields = {}
fields['id'] = { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true };
fields['username'] = { type: DataTypes.STRING(100), allowNull: false };
fields['email'] = { type: DataTypes.STRING(100), allowNull: false };
fields['password'] = { type: DataTypes.STRING(100), allowNull: true };
fields['google_id'] = { type: DataTypes.STRING(100), allowNull: true };
fields['profile_picture'] = { type: DataTypes.STRING(100), allowNull: true };
fields['auth_provider'] = { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'local' };

const indexes = [
    { fields: ['username'] },
    { fields: ['email'] }
];

module.exports = dbConnector.define('users', fields, { indexes, freezeTableName: true });


