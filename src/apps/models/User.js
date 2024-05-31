const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            user_name: Sequelize.STRING,
            email: Sequelize.STRING,
            avatar: Sequelize.STRING,
            bio: Sequelize.STRING,
            gender: Sequelize.STRING,
            password: Sequelize.VIRTUAL, // não existe na tabela
            password_hash: Sequelize.STRING,
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

   async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

module.exports = Users;
