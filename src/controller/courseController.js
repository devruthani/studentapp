
const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { Courses, Coursecontent } = require("../model");
const { Model } = require("../model/courses.model");



const courseController ={
  
 /* ------------------------------ create group ------------------------------ */
async createCourse(req,res){
    try{
        const courseId = crypto.randomBytes(16).toString("hex");

        const courses = await Courses.create({
            courseid: courseId,
            title:req.body.title,
            description:req.body.description,
            outline:req.body.outline,
            schedule:req.body.schedule,
            price:req.body.price,
            thumnail:req.body.thumnail
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

async fetchCourses(req, res) {
    try {
        const limit = Number(req.params.limit);
        const offset = Number(req.params.offset);

        const totalCourses = await Courses.count(); // Get the total number of courses
        const totalPages = Math.ceil(totalCourses / limit); // Calculate total pages

        const fetchAllcourses = await Courses.findAll({
            limit: limit,
            offset: offset
        });

        if (fetchAllcourses) {
            return res.status(200).json({
                error: false,
                message: "Courses acquired successfully",
                data: fetchAllcourses,
                totalPages: totalPages // Send totalPages in the response
            });
        } else {
            return res.status(404).json({
                error: true,
                message: "Failed to fetch courses"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Error fetching courses",
            data: error.message
        });
    }
},


/* ----------------------------- GET COURSE BY ID ---------------------------- */

// getting a course by id alogside with its course content  using syquelize association 

// async getByid(req, res) {
//     try {
//       const  courseId  = req.params.courseid;
      
//       // Fetch the course along with its associated course content
//       const findCourse = await Courses.findOne({
//         where: { courseid:courseId },
//         include: [{
//           model: Coursecontent,
//           as: 'coursecontent'
//         }]
//       });
      
//       if (findCourse) {
//         return res.status(200).json({
//           error: false,
//           message: "Course information acquired successfully",
//           data: findCourse
//         });
//       } else {
//         return res.status(404).json({
//           error: true,
//           message: "Failed to acquire course information"
//         });
//       }
      
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         error: true,
//         message: "Oops! Something went wrong",
//         data: error.message
//       });
//     }
//   },
  

//   this is the endpoint i am using, since the sequelize association did not work 
async fetchByid(req,res){
    try {
        
   const {courseid} = req.params;
   const getCourseContent = await Coursecontent.findAll();
    const getByid = await Courses.findOne();

    if(getByid){
        let allCourseContents = [];
        getCourseContent.map((course) => {
            if(course.courseid === courseid) {
                allCourseContents = [...allCourseContents, course];
            }
        });
      
        return res.status(200).json({
            error:false,
            message:"Course information acquired successfully",
            data:{getByid, mycoursecontent: allCourseContents}
        })
      
      

    }else{

     


        return res.status(404).json({
            error:true,
            message:"Failed to acquire course information"
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
        const {courseid} = req.params;
        const updateCourse = await Courses.findOne({where:{courseid:courseid}});


        if(!updateCourse){
            return res.status(200).json({
                error:true,
                message:"Course with this id not found"
            })

        }else{
            await Courses.update({
                title:req.body.title,
                description:req.body.description,
                outline:req.body.outline,
                schedule:req.body.schedule,
                price:req.body.price,
                thumnail:req.body.thumnail

            });
           
            return res.status(400).json({
                error:false,
                message:"Course information updated successfully"
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
async delete(req,res){
    try{
        const {courseid } = req.params;
        const delCourse = await Courses.findOne({where: {courseid}});

        if(!delCourse){
            return res.status(404).json({ error:true,message: "Course not found" });

        }else{
            await Courses.destroy();
            res.status(200).json({ 
                error:false,
                message: "course deleted successfully" });


        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"Error deleting course",
            data:error.message
        });

    }
}



}
module.exports = {courseController}