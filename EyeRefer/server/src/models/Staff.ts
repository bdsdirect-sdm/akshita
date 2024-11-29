import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as UUIDV4 } from "uuid";
import User from "./User";

class Staff extends Model{
    public uuid!: number;
    public doc!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public gender!: string;
}

Staff.init({
    uuid:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    gender:{
        type: DataTypes.STRING,
    },
},{
    sequelize,
    modelName:'Staff'
})

User.hasMany(Staff, {foreignKey: "user", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Staff.belongsTo(User, {foreignKey: "user", onDelete: 'CASCADE', onUpdate: 'CASCADE'});

export default Staff;
