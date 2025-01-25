import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import User from "./users.model";

class Waves extends Model {
    public id!: number;
    public userId!: number;
    public photos!: string | null;
    public videos!: string | null;
    public post!: string;
    public fullName!: string;
}

Waves.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    photos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    videos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    post: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Waves',
    tableName: 'waves',  
    timestamps: true,    
    paranoid: true,     
});

export default Waves;


User.hasMany(Waves, {
    foreignKey: 'userId',
    as: 'waves', 
});

Waves.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
