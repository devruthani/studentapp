const Sequelize = require("sequelize");

require('dotenv').config();


const createSequelizeInstance = () =>{
    
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
         process.env.USER_NAME,
          process.env.DATABASE_PASSWORD,
          {
             host: process.env.HOST,
             dialect: process.env.DIALECT,
             operatorsAliases: true,
             port: process.env.DBPORT ,
             logging:false,
         }
    )
    return sequelize;
};

// const createSequelizeInstance = () =>{
//     const url=`mysql://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE_NAME}`;
//     const sequelize =   new Sequelize(url);
//     return sequelize;
// };
const DB = {};

const initialInstance = createSequelizeInstance();

DB.Sequelize = Sequelize;
DB.sequelize = initialInstance;


//Register Sequelize Models
const Auth = DB.auth = require("./auth.model.js").Model(initialInstance, createSequelizeInstance(), Sequelize);



module.exports = {
    DB,
    Auth,
    
    
};

