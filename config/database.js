const Sequelize = require('sequelize');

// configure this with your own parameters
const database = new Sequelize({
    database: 'ska_sequelize',
    username: 'root',
    password: '',
    dialect: 'mysql',
});

module.exports = database;
