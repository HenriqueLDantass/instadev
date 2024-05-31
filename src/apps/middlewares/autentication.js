const decryptedToken = require('../utils/token'); // ou '../utils/token.js'
const { decrypt } = require('../utils/crypto');

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não está setado" });
    }

    try {
        const { userId } = await decryptedToken(authHeader); // Verifica o token JWT de forma assíncrona
        req.userId = parseInt(decrypt(userId)); // Descriptografa o userId

        return next();
    } catch (error) {
        console.error('Erro na verificação do JWT:', error);
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
};

module.exports = verifyJwt;
