import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconnect';  
import User from './users.model'; 

class Friend extends Model {
  public id!: number;
  public waveId!: number; 
  public userId!: number; 
  public status!: boolean;
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    friend1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friend2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,  
    modelName: 'Friend',  
    tableName: 'friends',  
    timestamps: true,
    paranoid: true, 
  }
);



User.hasMany(Friend, {
  foreignKey: 'userId',
  as: 'friend',
});

Friend.belongsTo(User, {
  foreignKey: 'friend1',
  as: 'request',
});

Friend.belongsTo(User, {
  foreignKey: 'friend2',
  as: 'receive',
});

export default Friend;