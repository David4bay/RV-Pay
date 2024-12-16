const validateInput = require("./utils/validateInput")
const db = require("../knex-database/database")

async function createAccount(request, response) {
    const userDetails = request.body
    // The token is to make sure only validated users can create an account
    const token = request.body.token
    // The user will be undefined so we populate it on creation
    let user

    if (!user || !validateInput(userDetails)) {
        response.statusCode = 400
        response.json({ message: "bad request, no user provided.", status: 400 })
        return
    }

    let hashedPassword = bcrypt.hash(puserDetails.password, process.env.HASH_COUNT)

    if (!token) {
        response.statusCode = 401
        response.json({ message: "unauthorized to create an account.", status: 401 })
        return
    }

    try {
        user = await db("account").insert({ email, password: hashedPassword })
        console.log("user", user, "userDetails", userDetails)
        return
    } catch (error) {
        response.statusCode = 500
        response.json({ message: "unable to save create account.", status: 500})
        return
    }
}

module.exports = createAccount