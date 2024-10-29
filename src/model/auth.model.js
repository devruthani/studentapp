
const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        userid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        firstname : {
            type: Sequelize.STRING,
            allowNull:false
        },
        lastname : {
            type: Sequelize.STRING,
            allowNull:false

        },
        mobile: {
            type: Sequelize.STRING,
            allowNull:false

        },
        email: {
            type: Sequelize.STRING,
            allowNull:false

        },
        password: {
            type: Sequelize.STRING,
            allowNull:false

        },
        gender: {
            type: Sequelize.STRING,
            allowNull:true

        },
        state: {
            type: Sequelize.STRING,
            allowNull:true

        },
        country: {
            type: Sequelize.STRING,
            allowNull:true

        },
        address: {
            type: Sequelize.STRING,
            allowNull:true

        },
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("auth", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Auth = instance.define("auth", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Auth;
}

module.exports = { Schema , Model};