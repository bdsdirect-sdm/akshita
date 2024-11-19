import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    room: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

export default Message;