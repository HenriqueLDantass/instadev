
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {encrypt} = require('../utils/crypto')
class AuthController {

    async authentication(req, res) {
        const { email, user_name, password } = req.body;

        let whereClause = {};
        if (email) {
            whereClause.email = email;
        } else if (user_name) {
            whereClause.user_name = user_name;
        } else {
            return res.status(401).json({error: "Username ou email e necessario"})
        }

        const user = await User.findOne({
            where: whereClause
        })

        if (!user) {
            return res.status(401).json({erro:"Usuario nao encontrado"});
        }

        if (!await user.checkPassword(password)) {
            return res.status(401).json({erro:"senha incorreta!"});
        }

        const {id, user_name:username} = user;


        const {iv, contend} = encrypt(id);
        const newId = `${iv}:${contend}`


        const token = jwt.sign({userId: newId}, process.env.HASH_MD5,{
            expiresIn: "7d"
        })

        return res.status(200).json({  user: {id,username}, token });

    }

}


module.exports = new AuthController();