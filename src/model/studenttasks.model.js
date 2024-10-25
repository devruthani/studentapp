


const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        studenttaskid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        taskid : {
            type: Sequelize.STRING,
            allowNull:false

        },
        status: {
            type: Sequelize.STRING,
            allowNull:false

        },
      
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("studenttasks", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Studenttasks = instance.define("studenttasks", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Studenttasks;
}

module.exports = { Schema , Model};