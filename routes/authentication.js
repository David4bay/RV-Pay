const jwt = require("jsonwebtoken")
const auth = require("express").Router()
const bcrypt = require("bcrypt")
const db = require("../knex-database/database")

auth.get("/login", async function(request, response) {

    // Programmatically fetch credentials from redirect url, password is prehashed
    let email = request.query.username || request.body.email
    let password = request.query.credentials || requeest.body.password
    const redirect = request.query.redirect || false

    let user
    let token

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
})

auth.post("/signup", async function(request, response) {

    const email = request.body.email
    const password = request.body.password

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

        await db("user").insert({ email, password})
        response.redirect(`/login/?username=${email}&credentials=${password}&redirect=true`)
        return
    } catch(error) {
        response.statusCode = 500
        response.json({ message: "unable to save user.", status: 500 })
        return
    }
})

module.exports = auth