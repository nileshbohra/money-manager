require('dotenv').config();
const Sequelize = require('sequelize');

let connector;
if (process.env.REMOTE_MYSQL_URL) {
    connector = new Sequelize(process.env.REMOTE_MYSQL_URL);
} else {
    connector = new Sequelize(
        process.env.db_name,
        process.env.db_username,
        process.env.db_password,
        {
            host: process.env.db_host,
            dialect: 'mysql',
            port: process.env.db_port
        }
    );
}

module.exports = connector;