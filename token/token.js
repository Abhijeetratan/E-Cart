//import jwt-simple
let jwt = require('jwt-simple')
module.exports = (obj, ekey) => {
    return jwt.encode(obj, ekey)
}


