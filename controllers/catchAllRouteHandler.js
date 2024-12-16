
async function catchAllRouteHandler(_, response) {

    response.statusCode = 500
    response.json({ message: "invalid route.", status: 500})
    return
}

module.exports = catchAllRouteHandler