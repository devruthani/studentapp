

const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {
        

        contentid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        courseid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        topic : {
            type: Sequelize.STRING,
            allowNull:false
        },
        topicsummary : {
            type: Sequelize.STRING,
            allowNull:false

        },
        thumnail: {
            type: Sequelize.STRING,
            allowNull:true

        },
        video: {
            type: Sequelize.STRING,
            allowNull:true

        },
        notes: {
            type: Sequelize.STRING,
            allowNull:true

        },
        refference: {
            type: Sequelize.STRING,
            allowNull:true

        },
      
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("coursecontent", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Coursecontent = instance.define("coursecontent", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Coursecontent;
}

module.exports = { Schema , Model};