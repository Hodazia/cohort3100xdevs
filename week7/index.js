const mongoose = require("mongoose");
const {UserModel, TodoModel} = require("./db")
const express = require("express");

const app = express();
//await mongoose.connect("mongodb+srv://zia23hoda:UzWx9ISI1qXw57ST@cluster00.7eniu.mongodb.net/todo");

app.use(express.json())
/* Define a model/Schema for inserting the data */

app.post("/signup",function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // the below is an async operation, the server can be anywhere in the US, Bahrain, and it can take  2 sec,
    // it is an async operation and shall return a promise, the better idea is to await the response, 
    // 

    await UserModel.insert({
        email: email,
        password: password,
        name: name
    });

    res.json({
        message:"You are logged in"
    });
})



app.post("/signin", (req,res) =>{

})

app.post("/todo", (req,res) =>{

})

app.post("/todos", (req,res) =>{
    //only if the user is authenticated. logged in then only you can get the todos from the DB, 
})