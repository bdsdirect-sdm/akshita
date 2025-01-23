import { Sequelize } from "sequelize";
import { Local } from "../env";
import Comments from "../models/comments.model";

const DB_NAME:any = Local.DB_NAME
const DB_PASSWORD:any = Local.DB_PASSWORD
const DB_HOST:any = Local.DB_HOST

const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, {
    host:"localhost",
    dialect: 'mysql'
})

export const dbconnect = () =>{
    sequelize.sync({alter:true}).then(()=>{
        // Comments.associate()
        console.log("database connected and synchronized successfully")
    }).catch((err) =>{
        console.log(err)
        console.log("problem in connecting database")
    })

    
}

export default sequelize;