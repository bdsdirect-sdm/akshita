import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconnect';  
import User from './users.model'; 

class Friend extends Model {
  public id!: number;
  public sender!: number; 
  public receiver!: number; 
  public receiverEmail!: string;
  public status!: "pending" | "accepted";
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted"),
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