const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, "First name is required"],
    },
    lastName:{
    type: String,
    required: [true, "Last name is required"]
    },
    userName:{
        type: String,
        unique: true,
        min: [3, 'User name should be contain atleast 3 character'],
        max: 15
    },
    password: {
        type: String,
        required: [true, "User must have password"]
    }    
});

// Hash the password ( Document Middleware)
userSchema.pre('save', async function(next){
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.pre(/^find/, async function(next){
    
})


// Match password
userSchema.methods.matchPassword = async function(password, hashPassword){
    return await bcrypt.compare(password, hashPassword);
}


// Compiling Model
const User = mongoose.model("User", userSchema);

module.exports = User;