const User = require('../Models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const authController = {

signUp: async (req, res) => {

    try{

        // Create User
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        });


        // Create jwt token
        jwtToken = jwt.sign({id: newUser._id}, process.env.APP_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});


        // Set cookie option
        let cookieOptions = {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 90)), // Time in milisecond
            httpOnly: true
        }

        // Set to client cookie
        res.cookie('jwt', jwtToken, cookieOptions);
        newUser.password = undefined;

        // Send response to the client
        return res.status(201).json({
            status: 'success',
            token: jwtToken, 
            data: {
                user: newUser
            }
        })

    }
    catch(error){
        return res.status(404).json({
            status: 'fail',
            msg: error.message,
            errorStack: error.stack,
            error: error
        })
    }

},

login: async (req, res)=>{

    try{

        const { userName, password } = req.body;

        // User input validation
        if (!userName || !password){

            return res.status(400).json({
            status: "fail",
            message: "User name & password can't be empty"
            });
        }

        const user = await User.findOne({userName: userName});


        // Check if user exists with the following user name & match the password if exists
        if(!user || !(await user.matchPassword(password, user.password))) {
            return res.status(404).json({
                status: "fail",
                message: "Username or password is not valid"
            })
        }

         // Create jwt token
        jwtToken = jwt.sign({id: user._id}, process.env.APP_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});


        // Set cookie option
        let cookieOptions = {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 90)), // Time in milisecond
            httpOnly: true
        }

        // Set to client cookie
        res.cookie('jwt', jwtToken, cookieOptions);

        user.password = undefined;

        return res.status(200).json({
            status: "success",
            token: jwtToken, 
            data: {
                user
            }
        })


    }
    catch(error){
        return res.status(404).json({
            status: 'fail',
            msg: error.message,
            errorStack: error.stack,
            error: error
        })
    }
   
},

allUsers: async (req, res)=>{
    try{

        const users = await User.find().select('-password');

        return res.status(200).json({
            status: "success",
            totalResult: users.length,
            data:{
                users
            }
        })

    }
     catch(error){
        return res.status(404).json({
            status: 'fail',
            msg: error.message,
            errorStack: error.stack,
            error: error
        })
    }
},

getUser: async (req, res)=>{
    try{

        const user = await User.findById(req.params.id).select('-password');

        return res.status(200).json({
            status: "success",
            data:{
                user
            }
        })

    }
    catch(error){
        return res.status(404).json({
            status: 'fail',
            msg: error.message,
            errorStack: error.stack,
            error: error
        })
    }
},


}

module.exports = authController;