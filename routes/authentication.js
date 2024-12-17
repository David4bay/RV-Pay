
const auth = require("express").Router()

const signinUser = require("../controllers/signinUser")
const signupUser = require("../controllers/signupUser")

auth.get("/login", signinUser)

auth.post("/signup", signupUser)

module.exports = auth