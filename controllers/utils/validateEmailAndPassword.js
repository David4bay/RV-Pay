

function validateCredentials(email, password) {
    let statusCode
    let message
    // Gave a generous regular expression for email validation,
    // proper email validation should be done using a middleware
    let emailRegex = /^\S+@\S+\.\S+$/
    switch(true) {
        case typeof email !== "string":
            statusCode = 400
            message = "email is in an invalid format."
            break
        case typeof password !== "string":
            statusCode = 400
            message = "password is in an invalid format."
            break
        case emailRegex.test(email) === false:
            statusCode = 400
            message = "invalid email format."
            break
        case password.length < 8:
            statusCode = 400
            message = "password too short, password must be longer than 7 characters."
            break
        default:
            statusCode = 200
            message = "ok"
            break
    }
    return { statusCode, message }
}

module.exports = validateCredentials