const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { Group } = require("../model");
const { Model } = require("../model/group.model");



const groupController ={

 /* ------------------------------ create group ------------------------------ */
async createGroups(req,res){
    try{
        const groupId = crypto.randomBytes(16).toString("hex");

        const groups = await Group.create({
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
            return res.status(404).json({
                error:true,
                message:"Failed to create group",
                
            })

        }

    }catch(error){
        console.log(error);
        return  res.status(500).json({
            error:true,
            message: "Oops! some thing went wrong",
            data:error.message
            })

    }
},

/* ----------------------------- GET GROUP BY ID ---------------------------- */

async fetchByid(req,res){
    try {
        
   const {groupid} = req.params
    const getByid = await Group.findOne({where:{groupid}});
    if(!getByid){
        return res.status(404).json({
            error:true,
            message:"Failed to acquire group information"
        });
       

    }else{
        return res.status(200).json({
            error:false,
            message:"Group information acquired successfully",
            data:getByid
        });
       
    }
} catch (error) {
console.log(error);
return  res.status(500).json({
    error:true,
    message: "Oops! some thing went wrong",
    data:error.message
    })
        
}
},

async editGroup(req,res){
    try{

        const {groupid} = req.params;
        const updateGroup = await Group.findOne({where:{groupid}});

        if(!updateGroup){
            return res.status(404).json({
                error:true,
                message:"Group not found"
            })
           

        }else{
            await Group.update({
                groupname:req.body.groupname,
                groupdescription:req.body.groupdescription

            })
            return res.status(200).json({
                error:false,
                message:"Group information updated successfully"
            })

        }

    }catch(error){
        console.log(error);
    return  res.status(400).json({
    error:true,
    message: "Error in updating group information",
    data:error.message
    })

    }
},


}
module.exports = {groupController}