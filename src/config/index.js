require("dotenv").config();

const dbURL = process.env.DB_URL;

module.exports = { dbURL };
