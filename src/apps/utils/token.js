const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const decryptedToken = async (headerToken) => {
    const [, token] = headerToken.split(' ');

    // Verifica o token JWT de forma assíncrona usando promisify
    return promisify(jwt.verify)(token, process.env.HASH_MD5);
};

module.exports = decryptedToken;
