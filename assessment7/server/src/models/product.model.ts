import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection"
import User from "./user.model";

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ["Draft", "Published"],
        allowNull: true
    }
},
{
    paranoid: true,  //Enable soft delete(use destroy method, automatically ignores the soft-deleted products while listing)
    deletedAt: 'deletedAt' //Specifying the field name for the deletion timestamp
})

export default Product;




