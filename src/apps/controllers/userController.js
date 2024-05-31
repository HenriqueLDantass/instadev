const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
class UserController {

    async create(req, res) {
        //verificar se existe
        const verifyUser = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (verifyUser) {
            res.send({ message: "Usuario já existente" })
        }


        const user = await UserModel.create(req.body)
        res.send({ user })

    }

    async update(req, res) {
        const {
            name,
            avatar,
            bio,
            gender,
            old_password,
            new_password,
            confirm_new_password
        } = req.body;

        const user = await UserModel.findOne({
            where: {
                id: req.userId
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not exists" })
        }

        let encryptedPassword = "";
        if (old_password) {
           // Chame checkPassword na instância do usuário
           if (!await user.checkPassword(old_password)) {
            return res.status(401).json({ error: "Old password does not match" });
        }

            if (!new_password || !confirm_new_password) {
                return res.status(401).json({ error: "We need a new password and confirm_new_password attributes" });

            }

            if (new_password != confirm_new_password) {
                return res.status(401).json({ error: "New password and confirm new password does not match" })

            }
            encryptedPassword = await bcrypt.hash(new_password, 8);

        }
        await UserModel.update({
            name: name || user.name,
            avatar: avatar || user.avatar,
            bio: bio || user.bio,
            gender: gender || user.gender,
            password_hash: encryptedPassword || user.password_hash
        }, {
            where: {
                id: user.id
            }
        }
    );
    return res.status(200).json({message: "Usuario atualizado"})
    }

    async delete(req,res){
        const userToDelete = await UserModel.findOne({
            where: {
                id: req.userId
            }
        });
        if(!userToDelete){
            res.status(400).json({message: "Usuario nao encontrado"})
        }

        await userToDelete.destroy({
            where:{
                id:req.userId
            }
        })
        res.status(401).json({message: "Usuario deletado com sucesso"})

    
    
    }


    async userProfile(req,res){
        const user = await UserModel.findOne({
            attributes:['id','name','user_name','avatar','bio','gender'],
            where:{
                id: req.userId
            }
        })
        if(!user){
            return res.status(400).json({message: "Usuario nao encontrado"})
        }
        console.log(user);
        const {
             id , name , user_name , avatar , bio , gender 
        } = user ;

        return res.status(200).json({user: {
            id , name , user_name , avatar , bio , gender 

        }})

    }
}

module.exports = new UserController();