const mongoose = require('mongoose');

const dbConnect = async () =>{

    try{
    let connction = await mongoose.connect(process.env.LOCAL_DB);
    console.log("Application has connected successfully from the database")
    }
    catch(err){
        console.log("Database connection not established");
        console.log(err.name);
        console.log(err.message);
        console.log(err)
    }


}

module.exports = dbConnect;

