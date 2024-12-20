require("dotenv").config()

const PORT = process.env.PORT || 3000

const catchAllRouteHandler = require("./controllers/catchAllRouteHandler")
const auth = require("./routes/authentication")
const accounts = require("./routes/accounts")
// const transactions = require("./routes/transactions")

const express = require("express")

const app = express() 

app.use(express.json()) 

app.use("/v1", auth)
app.use("/v1", accounts)
// app.use("/v1", transactions)
app.get("*", catchAllRouteHandler)


app.listen(PORT, function() {
    console.log(`[RAVEN SERVER] Running on port ${PORT}.`)
})

