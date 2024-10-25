

const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        courseregid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        userid : {
            type: Sequelize.STRING,
            allowNull:false
        },
              
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("courseregister", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Courseregister = instance.define("courseregister", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Courseregister;
}

module.exports = { Schema , Model};