
const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { Courses } = require("../model");
const { Model } = require("../model/courses.model");



const courseController ={
  
 /* ------------------------------ create group ------------------------------ */
async createCourse(req,res){
    try{
        const courseId = crypto.randomBytes(16).toString("hex");

        const courses = await Courses.create("courses",{
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
            return res.status(404).json({
                error:true,
                message:"Failed to create course",
                
            })

        }

    }catch(error){
        console.log(error);
        return  res.status(500).json({
            error:true,
            message: "Oops! some thing went wrong"
            })

    }
},

/* ----------------------------- get all courses ---------------------------- */
async fetchCourses(req,res){
    try{

    
    const fetchAllcourses = await Courses.findAll();
    if(fetchAllcourses){
        return res.status(200).json({
        error:false,
        message:"Courses acquired successfully",
        data:fetchAllcourses
        })
    }else{
        return res.status(404).json({
            error:true,
            message:"Failed to fetch courses"
        })

    }
}catch(error){
    console.log(error)
    return res.status(500).json({
        error:true,
        message:"Error fetching courses",
        data:error.message
    })

}

},

/* ----------------------------- GET GROUP BY ID ---------------------------- */



async fetchByid(req,res){
    try {
        
   const {courseid} = req.params;
    const getByid = await Courses.findOne({where:{courseid}});
    if(!getByid){
        return res.status(404).json({
            error:true,
            message:"Failed to acquire course information"
        })
      

    }else{
        return res.status(200).json({
            error:false,
            message:"Course information acquired successfully",
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
async delete(req,res){
    try{
        const {courseid } = req.body;
        const delCoursereg = await Courseregister.findOne({where: {courseid}});

        if(!delCoursereg){
            return res.status(404).json({ error:true,message: "Course register not found" });

        }else{
            await Courseregister.destroy();
            res.status(200).json({ 
                error:false,
                message: "course register deleted successfully" });


        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"Error deleting course register",
            data:error.message
        });

    }
}



}
module.exports = {courseController}