import sequelize from "../config/dbConnection";

async function serverInitialize(){
    sequelize.sync()
    .then(() => {
        console.log("Table synced!");
    })
}

export default serverInitialize;