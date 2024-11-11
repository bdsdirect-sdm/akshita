import sequelize from "../config/dbConnection";
import Product from "./product.model";
import User from "./user.model";

User.hasMany(Product, {
    foreignKey: "user_id" as "products"
})

Product.belongsTo(User, {
    foreignKey: "id" as "user"
})

async function serverInitialize(){
    await User.sync()
    .then(() => {
        console.log("Table synced!");
    })

    await Product.sync()
    .then(() => {
        console.log("Table synced!");
    })    
}

export default serverInitialize;