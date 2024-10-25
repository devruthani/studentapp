const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { encrypt } = require("../utils/encrypt");
const randomOtp = require("random-otp-generator");
const { sendMail } = require("../utils/nodemailer");
const Cache = require("memory-cache");
const jwt = require("jsonwebtoken");


const groupController ={

 /* ------------------------------ create group ------------------------------ */
async createGroups(req,res){
    try{
        const groupId = crypto.randomBytes(16).toString("hex");

        const groups = await db.create("groups",{
            groupid: groupId,
            groupname:req.body.groupname,
            courseid:req.body.courseid,
            groupdescription:req.body.groupdescription
        });
        if(groups){
            return res.status(200).json({
                error:false,
                message:"Group created successfully",
                
            })
            
        }else{
            return res.status(400).json({
                error:true,
                message:"Failed to create group",
                
            })

        }

    }catch(error){
        console.log(error);
        return  res.status(400).json({
            error:true,
            message: "Oops! some thing went wrong"
            })

    }
},

/* ----------------------------- GET GROUP BY ID ---------------------------- */

async fetchByid(req,res){
    try {
        
   
    const getByid = await db.select("groups",{groupid:req.params.groupid});
    if(getByid){
        return res.status(200).json({
            error:false,
            message:"Group information acquired successfully",
            data:getByid
        })

    }else{
        return res.status(400).json({
            error:true,
            message:"Failed to acquire group information"
        })
    }
} catch (error) {
console.log(error);
return  res.status(400).json({
    error:true,
    message: "Oops! some thing went wrong"
    })
        
}
},

async editGroup(req,res){
    try{
        const updateGroup = await db.update("groups",{
            groupname:req.body.groupname,
            groupdescription:req.body.groupdescription
        },{id:req.body.id});


        if(updateGroup){
            return res.status(200).json({
                error:false,
                message:"Group information updated successfully"
            })

        }else{
            return res.status(400).json({
                error:true,
                message:"Fail to update group information"
            })

        }

    }catch(error){
        console.log(error);
    return  res.status(400).json({
    error:true,
    message: "Oops! some thing went wrong"
    })

    }
},


}
module.exports = {groupController}