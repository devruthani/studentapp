
const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { encrypt } = require("../utils/encrypt");
const randomOtp = require("random-otp-generator");
const { sendMail } = require("../utils/nodemailer");
const Cache = require("memory-cache");
const jwt = require("jsonwebtoken");

const courseController ={
  
 /* ------------------------------ create group ------------------------------ */
async createCourse(req,res){
    try{
        const courseId = crypto.randomBytes(16).toString("hex");

        const courses = await db.create("courses",{
            courseid: courseId,
            title:req.body.title,
            description:req.body.description,
            outline:req.body.outline,
            schedule:req.body.schedule,
            price:req.body.price
        });
        if(courses){
            return res.status(200).json({
                error:false,
                message:"Course created successfully",
                
            })
            
        }else{
            return res.status(400).json({
                error:true,
                message:"Failed to create course",
                
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
        
   
    const getByid = await db.select("courses",{courseid:req.params.courseid});
    if(getByid){
        return res.status(200).json({
            error:false,
            message:"Course information acquired successfully",
            data:getByid
        })

    }else{
        return res.status(400).json({
            error:true,
            message:"Failed to acquire course information"
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

async editCourse(req,res){
    try{
        const updateGroup = await db.update("courses",{
            title:req.body.title,
            description:req.body.description,
            outline:req.body.outline,
            schedule:req.body.schedule,
            price:req.body.price
        },{id:req.body.id});


        if(updateGroup){
            return res.status(200).json({
                error:false,
                message:"Course information updated successfully"
            })

        }else{
            return res.status(400).json({
                error:true,
                message:"Fail to update Course information"
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

/* ------------------------------ DELETE COURSE ----------------------------- */



}
module.exports = {courseController}