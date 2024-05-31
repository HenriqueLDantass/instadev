const UserModel = require('../models/User');
class UserController {

async create(req,res) {
    //verificar se existe
    const verifyUser = await UserModel.findOne({
        where:{
            email:  req.body.email
        }});

    if(verifyUser){
        res.send({message: "Usuario já existente"})
    }


    const user = await UserModel.create(req.body)
    res.send({user})

}

}

module.exports = new UserController();