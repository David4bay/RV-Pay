const db = require("../knex-database/database")

async function getAccount(request, response) {
    const accountId = request.params.id
    if (!accountId) {
        // to catch non-existent accounts
        response.statusCode = 404
        response.json({ message: 'account not found.', status: 404 })
        return
    }

    try {
        // find the account
        // can use select to pick and choose data to return 
        // but in this case its better to return all
        let accountInfo = await db("user").where("id", accountId)

        if (!accountInfo) {
            response.statusCode = 404
            response.json({ message: 'account not found.', status: 404 })
            return
        }
// i could leave accountInfo as-is if this is running es5+ of javascript
        response.status(200).json({ message: "retrieved account", status: 200, accountInfo: accountInfo})
        return

    } catch (error) {
        // catch invalid accounts
        response.statusCode = 404
        response.json({ message: 'account not found.', status: 404 })
        return

    } finally {
        // log results to console only during test and dev
        if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
            console.log(
                "[GET ACCOUNT]", accountId, 
                "[STATUS]", response.statusCode, 
                "[DATA]", accountInfo
            )
        }

    }
}

module.exports = getAccount