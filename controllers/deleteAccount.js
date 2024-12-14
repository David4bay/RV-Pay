const db = require("../knex-database/database")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

async function deleteAccount(request, response) {
    const accountId = request.params.id
    const token = request.body.token 

    if (!accountId) {
        response.statusCode = 404
        response.json({ message: 'account not found.', status: 404 })
        return
    }

    if (!token) {
        response.statusCode = 401
        response.json({ message: 'user not authorized.', status: 401 })
        return
    }

    const authorized = jwt.verify(token, JWT_SECRET)

    if (!authorized) {
        response.statusCode = 401
        response.json({ message: 'token authorization failed.', status: 401 })
        return
    }

    try {
        await db("account").where("id", accountId).del()
        response.statusCode = 204
        response.json({ message: "account deleted.", status: 204 })
        return
    } catch (error) {
        response.statusCode = 404
        response.json({ message: `unable to delete account. ${error}`, status: 404 })
        return
    } finally {
        if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
            console.log(
                "[GET ACCOUNT]", accountId, 
                "[STATUS]", response.statusCode, 
                "[DATA]", 
            )
        }
    }
}

module.exports = deleteAccount