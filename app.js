
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// sequelize connection 
const { DB } = require("./src/model");

  DB.sequelize.sync({
    force:false
  })
  .then(() => {
      console.log("Synced db.");
  })
  .catch((err) => {
      console.log("Failed to sync db: " + err.message);
});
// sequelize connection ends here




// import routes 

// auth routes 
const authRoutes = require("./src/routes/authRoutes");
// course routes 
const courseRoutes = require("./src/routes/courseRoutes")
// group routes 
const groupRoutes = require("./src/routes/groupRoutes")
const tasksRoutes = require("./src/routes/tasksRoutes")
const studentTaskRoutes = require("./src/routes/studentstaskRoutes");
const announcementRoutes = require("./src/routes/announcementRoutes");


app.use(authRoutes);
app.use(tasksRoutes)
app.use(studentTaskRoutes);
app.use(groupRoutes);
app.use(courseRoutes);
app.use(announcementRoutes);




// app.get("/",async(req,res)=>{
//     res.send("hello student")
// })

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})