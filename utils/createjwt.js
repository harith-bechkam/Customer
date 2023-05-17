let jwt = require('jsonwebtoken')
const createJwt = (id) => {
    //Assigning a token for logging user
    const token = jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25s' })
    return token
}
let refreshTokens = [];

module.exports = {createJwt,refreshTokens}
