require('dotenv').config();
const express = require('express');
const App = express();

// Make connection to MongoDb
const DB = require('./DB'); DB();

// Global Middleware( To get response in Json & Urlencoded form)
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const userRoute = require('./Routes/user');
const productRoute = require('./Routes/product');

App.use('/users', userRoute);
App.use('/products', productRoute);


App.listen(process.env.APP_PORT * 1, '127.0.0.1', ()=>{
    console.log("Sever is listing on local host");
})


