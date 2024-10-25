const express = require("express");
const { authController } = require("../controller/authController");
const router = express.Router();

// Auth routes 
router.post("/api/auth/signup",authController.signUp);
router.post("/api/auth/signin",authController.login);
router.post("/api/auth/forgotpass",authController.forgetPassword);
router.post("/api/auth/resentotp",authController.resentOTP);
router.post("/api/auth/verifyotp",authController.verifyOTP);
router.post("/api/auth/resetpassword",authController.resetPassword);


/* --------------------------- user profile route --------------------------- */
router.get("/api/user/getbyid/:userid",authController.getUserbyid);


module.exports = router;