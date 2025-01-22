import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbconnect';
import Wave from './waves.model';
import User from './users.model';

class Comment extends Model {
  public id!: number;
  public comment!: string;
  public waveId!: number;
  public UserId!: number;
  public deletedAt!: Date | null;

  public static associate() {
    Wave.hasMany(Comment,{foreignKey:"waveId", onDelete:"CASCADE"})
    Comment.belongsTo(Wave, { foreignKey: 'waveId', onDelete: 'CASCADE' });

    User.hasMany(Comment,{foreignKey:"UserId", onDelete:"CASCADE"})
    Comment.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Wave,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    paranoid: true, // Enables soft deletes by using the deletedAt column
  }
);

export default Comment;


// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/dbconnect';  
// import User from './users.model'; 
// import Waves from './waves.model';

// class Comments extends Model {
//   public id!: number;
//   public waveId!: number; 
//   public userId!: number; 
//   public comment!: string;

//   public static associate(){
//     User.hasMany(Comments, {
//       foreignKey: 'userId',
//       as: 'comments',
//     });
    
//     Comments.belongsTo(User, {
//       foreignKey: 'userId',
//       as: 'user',
//     });
    
//     Waves.hasMany(Comments, {
//       foreignKey: 'waveId',
//       as: 'comments',
//     });
    
//     Comments.belongsTo(Waves, {
//       foreignKey: 'waveId',
//       as: 'wave',
//     });
//   }
// }

// Comments.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true,
//     },
//     comment: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,  
//     modelName: 'Comments',  
//     tableName: 'comments',  
//     timestamps: true,
//     paranoid: true, 
//   }
// );




// export default Comments;

