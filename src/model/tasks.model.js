
const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        taskid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        taskname : {
            type: Sequelize.STRING,
            allowNull:false
        },
        description : {
            type: Sequelize.STRING,
            allowNull:false

        },
        instructions: {
            type: Sequelize.STRING,
            allowNull:false

        },
        week: {
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
    sequelize.define("tasks", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Tasks = instance.define("tasks", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Tasks;
}

module.exports = { Schema , Model};