const { Courseregister } = require("../model")
const { Model } = require("../model/courseregister.model")





const courseRegisterController = {
    async createCourseReg(req,res){
        try{
            const courseregId = crypto.randomBytes(16).toString("hex");

            const couserReg = await Courseregister.create({
                courseregid: courseregId,
                courseid:req.body.courseid,
                userid:req.body.userid
            });
            if(couserReg){
                return res.status(200).json({
                    error:false,
                    message:"Course register created successfully"
                })
            }else{
                return res.status(400).json({
                    error:true,
                    message:"Failed to create course register"
                })

            }

        }catch(error){
            console.log(error)
            return res.status(500).json({
                error:true,
                message:"Error creating course register",
                data:error.message
            })
        }
    },

    async getCourseReg(req,res){
        try {
            const fetchCourseReg = await Courseregister.findAll();
            if(fetchCourseReg){
                return res.status(200).json({
                    error:false,
                    message:"Course register acquired successfully",
                    data:fetchCourseReg
                })

            }else{
                return res.status(404).json({
                    error:true,
                    message:"Failed to fetch course register"
                });
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error:true,
                message:"Error fetching course register",
                data:error.message
            });
            
        }
    },

    /* -------------------------------- get by id ------------------------------- */
    async getByid(req,res){
        try {

            const {courseregid} = req.params;
            const getByid = await Courseregister.findOne({where:{courseregid}});
            
            if(!getByid){
                return res.status(404).json({
                    error:true, 
                    message: "Course register not found" });

            }else{
                res.status(200).json({ 
                    error:false, 
                    message:"Course register found successfully",
                    data: getByid 
                });

            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error:true,
                message:"Error fetching course register",
                data:error.message
            });
            
        }
    },

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
module.exports ={courseRegisterController}