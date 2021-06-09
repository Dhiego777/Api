const configDataBase = require("../config/configDataBase");
const dbase = require("knex")(configDataBase);

module.exports = dbase;