const db = require("../../dbconnection/dbconfig");
const crypto = require("crypto");
const { encrypt } = require("../utils/encrypt");
const randomOtp = require("random-otp-generator");
const { sendMail } = require("../utils/nodemailer");
const Cache = require("memory-cache");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// email validation
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// password validation
var passwordsymbol = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
var numbercheck = /\d/;
var upperLowercase = /^(?=.*[a-z])(?=.*[A-Z])/;
// password validation end.git 

const authController = {
  async signUp(req, res) {
    try {
      const adminId = crypto.randomBytes(16).toString("hex");
      const password = encrypt(req.body.password);

      if (
        req.body.firstname &&
        req.body.lastname &&
        req.body.email &&
        req.body.mobile &&
        req.body.password
      ) {
        if (emailRegexp.test(req.body.email)) {
          const regAdmin = await db.insert("auths", {
            userid: adminId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: password,
          });
          if (regAdmin) {
            return res.status(200).json({
              error: false,
              message: "You have been registered successfully",
            });
          } else {
            return res.status(400).json({
              error: true,
              message: "Registration failed",
            });
          }
        } else {
          return res.status(400).json({
            error: true,
            message: "Email should be provided in the right format",
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          message: "All fields are required",
        });
      }
    } catch (error) {
      console.log(err);
      return res.status(400).json({
        error: true,
        message: "Oops! some thing went wrong",
      });
    }
  },

  //    admin login
  async login(req, res) {
    try {
      var regemail = req.body.email;
      var securedpassward = encrypt(req.body.password);
      const loginAdmin = await db.select("auths", {
        email: regemail,
        password: securedpassward,
      });

      if (loginAdmin.length > 0) {
        return res.status(200).json({
          error: false,
          message: "You've been logged in successfully",
          data: loginAdmin,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      console.log(err);
      return res.status(400).json({
        error: true,
        message: "Oops! some thing went wrong",
      });
    }
  },

  // forgot password

  // async forgetPassword(req, res) {
  //   try {
  //       // check if email was sent
  //       var checkEmail = req.body.email;
  //       if(checkEmail == undefined){
  //         return res.status(400).json({
  //           error: true,
  //           message: "No email was sent",
  //         });

  //       }else{
  //         const otp = randomOtp(6);

  //         Cache.put(checkEmail,otp)
  //         sendMail(checkEmail, 'OTP Verification Code', `<h1>Your OTP verification code is ${otp} </h1>`)

  //         return res.status(200).json({
  //           error:false,
  //           message: "An OTP has been sent to your email"
  //         })
  //       }

  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({
  //       error: true,
  //       message: "Oops! some thing went wrong",
  //     });
  //   }
  // },
  async forgetPassword(req, res) {
    try {
      // check if email was sent
      const checkEmail = req.body.email;
      if (!checkEmail) {
        return res.status(400).json({
          error: true,
          message: "No email was sent",
        });
      } else {
        const otp = randomOtp(6);
        // create a jwt containing the otp and email, with a 5 minutes expiration time
        const token = jwt.sign(
          { otp, email: checkEmail },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );

        // Send the token in the email (user will use this token in the verification process)
        await sendMail(
          checkEmail,
          "OTP Verification Code",
          `<h1>Your OTP verification code is ${otp} </h1>`
        );

        return res.status(200).json({
          error: false,
          message: "An OTP has been sent to your email",
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: "Oops! some thing went wrong",
      });
    }
  },

  /* ---------------- // resend otp if you did not get any one ---------------- */

  async resentOTP(req, res) {
    try {
      const checkEmail = req.body.email;
      if (!checkEmail) {
        res.status(400).json({
          error: true,
          message: "No email was provided",
        });
      } else {
        const otp = randomOtp(6);
        const token = jwt.sign(
          { otp, email: checkEmail },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );

        // send the new token and otp via email
        await sendMail(
          checkEmail,
          "OTP Verification Code",
          `<h1>Your OTP verification code is ${otp} </h1>`
        );

        return res.status(200).json({
          error: false,
          message: "An OTP has been sent to your email",
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: "Oops! some thing went wrong, failed to resend otp",
      });
    }
  },
  // 
  /* ------------------------------- verify otp ------------------------------- */
async verifyOTP(req, res) {
  try {
    const { token, verifyotp } = req.body;
    
    // Check if token or verifyotp is missing
    if (!token || !verifyotp) {
      return res.status(400).json({
        error: true,
        message: "OTP or token is missing",
      });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the decoded OTP matches the provided one
    if (decoded.otp === verifyotp) {
      return res.status(200).json({
        error: false,
        message: "OTP verified successfully",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "The OTP you provided is incorrect",
      });
    }

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        error: true,
        message: "The OTP has expired",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Invalid Token",
      });
    }
  }
},


  /* ----------------------------- reset password ----------------------------- */
  async resetPassword(req, res) {
    try {
      const newpassword = req.body.password;
      const confirmpassword = req.body.confirmpassword;
      const checkemail = req.body.email;
  
      // Check if the new password matches the confirmed password
      if (newpassword !== confirmpassword) {
        return res.status(400).json({
          error: true,
          message: "Passwords do not match"
        });
      } else {
        // Find user by email
        const theUser = await db.select("auths", { email: checkemail });
  
        if (theUser.length > 0) {
          // Encrypt the new password (replace with your encryption method)
          const encryptedPassword = encrypt(newpassword);
  
          // Update the user's password in the "auths" table
          await db.update("auths", { password: encryptedPassword }, { email: checkemail });
  
          return res.status(200).json({
            error: false,
            message: "Password reset successfully"
          });
        } else {
          return res.status(400).json({
            error: true,
            message: "User with this email does not exist"
          });
        }
      }
    } catch (error) {
      console.error('Password reset failed', error);
      return res.status(400).json({
        error: true,
        message: "Failed to reset password"
      });
    }
  }
  






};
module.exports = { authController };
