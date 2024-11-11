import { Sequelize } from "sequelize";
import { local } from "./dotenv.config";

const sequelize = new Sequelize(
    local.DB_Name as string,
    local.DB_User,
    local.DB_Password as string,
    {
        host: "localhost",
        dialect: "mysql"
    }
)

export default sequelize;