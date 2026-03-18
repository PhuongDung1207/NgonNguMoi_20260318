let fs = require('fs')
let path = require('path')
let jwt = require('jsonwebtoken')

const privateKeyPath = process.env.JWT_PRIVATE_KEY_PATH || path.join(__dirname, '..', 'keys', 'private.pem')
const publicKeyPath = process.env.JWT_PUBLIC_KEY_PATH || path.join(__dirname, '..', 'keys', 'public.pem')

function readKey(filePath, keyName) {
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        throw new Error(`khong doc duoc ${keyName} tai ${filePath}`)
    }
}

const privateKey = readKey(privateKeyPath, 'private key')
const publicKey = readKey(publicKeyPath, 'public key')

module.exports = {
    signToken: function (payload, options = {}) {
        return jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            ...options
        })
    },
    verifyToken: function (token, options = {}) {
        return jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
            ...options
        })
    }
}
