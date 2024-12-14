require("dotenv").config()

const PORT = process.env.PORT || 3000

const auth = require("./routes/authentication")
const accounts = require("./routes/accounts")
const transactions = require("./routes/transactions")

const express = require("express")

const app = express() 

app.use(express.json()) 

app.use("/v1", auth)
app.use("/v1", accounts)
app.use("/v1", transactions)

app.listen(PORT)

