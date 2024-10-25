

const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        groupid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        groupname : {
            type: Sequelize.STRING,
            allowNull:false

        },
        groupdescription: {
            type: Sequelize.STRING,
            allowNull:false

        },
      
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("group", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Group = instance.define("group", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Group;
}

module.exports = { Schema , Model};