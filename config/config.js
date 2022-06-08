require('dotenv').config({path: `${__dirname}/.env.db_config`});

module.exports = {
    username            : process.env.SERVER_DB_USERNAME,
    password            : process.env.SERVER_DB_PASSWORD,
    database            : process.env.SERVER_DB_NAME,
    host                : process.env.SERVER_DB_HOST,
    dialect             : process.env.SERVER_DB_ENGINE,
    migrationStorage    : "json",
    migrationStoragePath: "devMeta.json",
};
