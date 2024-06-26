const Sequelize = require("sequelize");
const databaseConfig = require("../configs/db");
const Users = require("../apps/models/User");
const Posts = require("../apps/models/Posts");

const models = [Users, Posts];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();
