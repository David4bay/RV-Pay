const validateInput = require("./utils/validateInput")

async function createAccount(request, response) {
    const user = request.body
    const token = request.body.token

    if (!user || !validateInput(user)) {
        response.statusCode = 400
        response.json({ message: "bad request, no user provided.", status: 400 })
        return
    }


    try {

    } catch (error) {

    } finally {

    }
}

module.exports = createAccount