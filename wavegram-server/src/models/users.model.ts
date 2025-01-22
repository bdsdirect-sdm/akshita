import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import Preferences from "./preferences.model";

class User extends Model {
    public id!: number;
    public profilePhoto!: string | null;
    public firstName!: string;
    public lastName!: string;
    public dob!: Date;
    public email!: string;
    public phone!: string;
    public gender!: 'Male' | 'Female' | 'Other';
    public address!: string;
    public state!: string;
    public city!: string;
    public zip!: string;
    public password!: string;
    public isDeleted!: boolean;
    public isActive!: boolean;
    public status!: boolean;
    // public roleId!: '1' | '2';
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        
        allowNull: false,
        // unique: true, 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
        allowNull: false
    }
    // roleId: {
    //     type: DataTypes.ENUM('1' | '2'),
    //     allowNull: true
    // },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',  
    timestamps: true,    
    paranoid: true,     
});

export default User;


User.hasOne(Preferences, {
    foreignKey: 'userId',
    as: 'preferences',  
});

Preferences.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
