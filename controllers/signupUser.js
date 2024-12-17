const bcrypt = require("bcrypt")
const db = require("../knex-database/database")

async function signupUser(request, response) {

    const email = request.body.email
    let password = request.body.password

    if (!email || !password) {
        response.statusCode = 400
        response.json({ message: "invalid/missing credentials.", status: 400 })
        return
    }

    const userExists = await db("user").where("email", email)

    if (userExists) {
        response.statusCode = 400
        response.json({ message: "user already exists.", status: 400 })
        return
    }

    password = bcrypt.hash(password, process.env.HASH_COUNT)

    try {

        await db("user").insert({ email, password })
        response.redirect(`/login/?username=${email}&credentials=${password}&redirect=true`)
        return
    } catch(error) {
        response.statusCode = 500
        response.json({ message: "unable to save user.", status: 500 })
        return
    }
}

module.exports = signupUser