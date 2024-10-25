
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
app.use(authRoutes);

// course routes 
const courseRoutes = require("./src/routes/courseRoutes")
app.use(courseRoutes);


// group routes 
const groupRoutes = require("./src/routes/groupRoutes")
app.use(groupRoutes);


// app.get("/",async(req,res)=>{
//     res.send("hello student")
// })

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})