
const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        title : {
            type: Sequelize.STRING,
            allowNull:false
        },
        description : {
            type: Sequelize.STRING,
            allowNull:false

        },
        outline: {
            type: Sequelize.STRING,
            allowNull:false

        },
        schedule: {
            type: Sequelize.STRING,
            allowNull:false

        },
        price: {
            type: Sequelize.STRING,
            allowNull:false

        },
      
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("courses", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Courses = instance.define("courses", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Courses;
}

module.exports = { Schema , Model};