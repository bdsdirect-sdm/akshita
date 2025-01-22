import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import User from './users.model'  // Import User model

class Preferences extends Model {
    public id!: number;
    public userId!: number;  // Foreign key to link to User model
    public language!: string;  // e.g., "English"
    public breakfast!: string;  // e.g., "07:00"
    public lunch!: string;  // e.g., "12:00"
    public dinner!: string;  // e.g., "19:00"
    public wakeTime!: string;  // e.g., "06:00"
    public bedTime!: string;  // e.g., "22:00"
    public weight!: string;  // e.g., "kg" or "lbs"
    public height!: string;  // e.g., "inches" or "cms"
    public sms!: boolean;  // true or false (SMS notifications enabled)
    public post!: boolean;  // true or false (Post notifications enabled)
}

Preferences.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Reference to the User model
            key: 'id',
        },
        onDelete: 'CASCADE',  // Deletes preferences if user is deleted
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    breakfast: {
        type: DataTypes.STRING,
        allowNull: true,  // Store time in "HH:MM" format
    },
    lunch: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dinner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    wakeTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bedTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true,  // "kg" or "lbs"
    },
    height: {
        type: DataTypes.STRING,
        allowNull: true,  // "inches" or "cms"
    },
    sms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    post: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Preferences',
    tableName: 'preferences',
    timestamps: true,    // Stores createdAt and updatedAt
    paranoid: true,     // Soft delete support
});

export default Preferences;
