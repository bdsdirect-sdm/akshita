import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "crud_ops",
    "root",
    "Password123#@!",
    {
        host: "localhost",
        dialect: "mysql"
    }
)

export default sequelize;