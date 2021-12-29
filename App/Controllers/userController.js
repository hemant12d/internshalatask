const User = require('../Models/User');


const userController = {

// Get the list of all the users
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

// Get the user on the basis of Id
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

module.exports = userController;