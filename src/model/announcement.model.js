

const generateTimestamps = require("./timestamp");

let Schema = (Sequelize,mode) => {

    return {

        announcementid : {
            type: Sequelize.STRING,
            allowNull:false
        },
        announcement_title : {
            type: Sequelize.STRING,
            allowNull:false
        },
    announcement_description : {
            type: Sequelize.STRING,
            allowNull:false

        },
      
        calltoaction: {
            type: Sequelize.STRING,
            allowNull:false

        },
      
      
        ...generateTimestamps(Sequelize,mode)
    }
}

const Model = (sequelize, instance, Sequelize) => {
    // Define initial for DB sync
    sequelize.define("announcement", Schema(Sequelize,1),{ timestamps: false });
    // Bypass initial instance to cater for timestamps
    const Announcement = instance.define("announcement", Schema(Sequelize,2),{ 
        timestamps: false,
       
    });
    return Announcement;
}

module.exports = { Schema , Model};