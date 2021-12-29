require('dotenv').config();
const express = require('express');
const App = express();
const DB = require('./DB'); DB();


App.listen(process.env.APP_PORT * 1, '127.0.0.1', ()=>{
    console.log("Sever is listing on local host");
})


