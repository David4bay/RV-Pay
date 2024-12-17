const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../knex-database/database")

async function signinUser(request, response) {

    // Programmatically fetch credentials from redirect url, password is prehashed
    let email = request.query.username || request.body.email
    let password = request.query.credentials || request.body.password
    const redirect = request.query.redirect || false

    let user
    let token

    if (!email || !password) {
        response.statusCode = 400
        response.json({ message: "no credentials provided.", status: 400 })
        return
    }

    

    if (!redirect) {

        let hashPassword = bcrypt.hash(password, process.env.HASH_COUNT)
    
        user = await db("user").where("email", email, "password", hashPassword)
    
        if (!user) {
            response.statusCode = 404
            response.json({ message: "user not found.", status: 404 })
            return
        }
    
        token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        response.status(200).json({ userId: user.id, status: 200, token: token })
        return

    } else {

        let hashPassword = password
    
        user = await db("user").where("email", email, "password", hashPassword)
    
        if (!user) {
            response.statusCode = 404
            response.json({ message: "user not found.", status: 404 })
            return
        }
    
        token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    
        response.status(200).json({ userId: user?.id, status: 200, token: token })
        return
    }
}

module.exports = signinUser