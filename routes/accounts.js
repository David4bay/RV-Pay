const userAccounts = require("express").Router()
const createAccount = require("../controllers/createAccount")
const deleteAccount = require("../controllers/deleteAccount")
const getAccount = require("../controllers/getAccount")
const modifyAccount = require("../controllers/modifyAccount")
const db = require("../knex-database/database")

// creation of account should not come with query params unless necessary
userAccounts.post("/account", createAccount)
// get specific account
userAccounts.get("/account/:id", getAccount)
// modify specific account
userAccounts.put("/account/:id", modifyAccount)
// delete specific account
userAccounts.delete("/account/:id", deleteAccount)

module.exports = userAccounts