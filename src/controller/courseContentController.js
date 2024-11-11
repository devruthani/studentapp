const db = require("../../dbconnection/dbconfig");
const { Coursecontent } = require("../model");
const { Model } = require("../model/coursecontent.model");
const crypto = require("crypto");


const courseContentController = {
    async createCourseContent(req,res){
        try{
            const contentId = crypto.randomBytes(16).toString("hex");
    
            const courseContent = await Coursecontent.create({
                contentid: contentId,
                courseid:req.body.courseid,
                topic:req.body.topic,
                topicsummary:req.body.topicsummary,
                thumnail:req.body.thumnail,
                video:req.body.video,
                notes:req.body.notes,
                refference:req.body.refference
            });
            if(courseContent){
                return res.status(200).json({
                    error:false,
                    message:"Course Content created successfully",
                    
                })
                
            }else{
                return res.status(404).json({
                    error:true,
                    message:"Failed to create course content",
                    
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

    async fetchCourseContent(req, res) {
        try {
          
            const allCourseContent = await Coursecontent.findAll();
    
            if (allCourseContent) {
                return res.status(200).json({
                    error: false,
                    message: "Courses Content acquired successfully",
                    data: allCourseContent,
                    
                });
            } else {
                return res.status(404).json({
                    error: true,
                    message: "Failed to fetch course Content"
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: true,
                message: "Error fetching course content",
                data: error.message
            });
        }
    },
    
    
    /* ----------------------------- GET COURSE BY ID ---------------------------- */
    
    
    
    async fetchContentByid(req,res){
        try {
            
       const {contentid} = req.params;
        const getByid = await Coursecontent.findOne({where:{contentid}});
        if(!getByid){
            return res.status(404).json({
                error:true,
                message:"Failed to acquire course content information"
            })
          
    
        }else{
            return res.status(200).json({
                error:false,
                message:"Course content information acquired successfully",
                data:getByid
            })
           
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

    /* --------------------------- fetch by course id --------------------------- */
    async fetchBycourseid(req,res){
        try {
            
       const {courseid} = req.params;
        const getBycourseid = await Coursecontent.findAll({where:{courseid}});
        if(!getBycourseid){
            return res.status(404).json({
                error:true,
                message:"Failed to acquire course content information"
            })
          
    
        }else{
            return res.status(200).json({
                error:false,
                message:"Course content information acquired successfully",
                data:getBycourseid
            })
           
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
    
    async editCourseContent(req,res){
        try{
            const {contentid} = req.params;
            const updateContent = await Coursecontent.findOne({where:{contentid:contentid}});
         
            if(!updateContent){
                return res.status(200).json({
                    error:true,
                    message:"Course content with this id does not exist"
                })
    
            }else{
                await Coursecontent.update({
                    topic:req.body.topic,
                    topicsummary:req.body.topicsummary,
                    thumnail:req.body.thumnail,
                    video:req.body.video,
                    notes:req.body.notes,
                    refference:req.body.refference

                },{where:{contentid:req.params.contentId}})
               
                return res.status(400).json({
                    error:false,
                    message:"Course Content updated successfully"
                })
    
            }
    
        }catch(error){
            console.log(error);
        return  res.status(400).json({
        error:true,
        message: "Oops! some thing went wrong",
        data:error.message
        })
    
        }
    },
    
    /* ------------------------------ DELETE COURSE ----------------------------- */
    async deleteContent(req,res){
        try{
            const {contentid } = req.params;
            const delContent = await Coursecontent.findOne({where: {contentid}});
    
            if(!delContent){
                return res.status(404).json({ error:true,message: "Course register not found" });
    
            }else{
                await Coursecontent.destroy();
                res.status(200).json({ 
                    error:false,
                    message: "course content deleted successfully"});
    
    
            }
    
        }catch(error){
            console.log(error)
            return res.status(500).json({
                error:true,
                message:"Error deleting course content",
                data:error.message
            });
    
        }
    }


}
module.exports = {courseContentController}