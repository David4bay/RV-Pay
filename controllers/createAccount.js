// const credentialsExist = require("./utils/validateInput")
const validateEmailAndPassword = require("./utils/validateEmailAndPassword")
const db = require("../knex-database/database")

async function createAccount(request, response) {
    const userEmail = request.body.email
    const userPassword = request.body.password
    // The token is to make sure only validated users can create an account
    let token = request.body.token
    // The user will be undefined so we populate it on creation
    let user

    if (!userPassword || !userEmail) {
        response.statusCode = 400
        response.json({ message: "bad request, no user provided.", status: 400 })
        return
    }

    if (!token) {
        response.statusCode = 401
        response.json({ message: "unauthorized to create an account.", status: 401 })
        return
    }

    if (validateEmailAndPassword(userEmail, userPassword).statusCode === 400) {
        let message = validateEmailAndPassword(userEmail, userPassword).message
        response.statusCode = 400
        response.json({ message: message, status: 400 })
        return
    }
    
    let userExists = await db("user").where("password", password)

    if (!userExists) {
        response.statusCode = 400
        response.json({ message: "user does not exist.", status: 400 })
        return
    }

    let hashedPassword = bcrypt.hash(userPassword, process.env.HASH_COUNT)

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!verifyToken) {
        response.statusCode = 401
        response.json({ message: "unauthorized to create an account.", status: 401 })
        return
    }

    try {
        user = await db("account").insert({ email, password: hashedPassword })
        console.log("user", user, "userDetails", userDetails)
        response.status(201).json({ message: "successfully created an account.", status: 201 })
        return
    } catch (error) {
        response.statusCode = 500
        response.json({ message: "unable to save create account.", status: 500})
        return
    }
}

module.exports = createAccount