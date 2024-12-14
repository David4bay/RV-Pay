function validateInput(user) {

    switch(true) {
        case !user.email:
            return false
        case !user.password:
            return false
        default:
            return true
    }
}

module.exports = validateInput