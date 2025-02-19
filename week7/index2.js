const express = require("express");

const app =express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/coursera");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 8 },
    skills: [{ type: String }],
    dob: { type: Date },
});

// Student model
const Student = mongoose.model("Student", studentSchema);

// Creating Student document from Model
let student1 = new Student({
    name: "GFG",
    age: 12,
    skills: ["Drawing", "Craft", "Football"],
    dob: new Date("2010-08-08"),
});

// Saving to database
student1.save().then(async (doc) => {
    if (doc) {
        console.log("The student data saved succesfully");
    }
})

