const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');
const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB_URL;

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(" Connected to MongoDB !"))
    .catch((err) => console.error("Error:", err));


router.post('/', async (req, res) => {
    try {
        const newStudent = new StudentModel();
        newStudent.StudentId = Number(req.body.StudentId);
        newStudent.Name = req.body.Name;
        newStudent.Roll = Number(req.body.Roll ? req.body.Roll : Math.floor(Math.random() * 1000));
        newStudent.Birthday = req.body.Birthday;
        newStudent.Address = req.body.Address;
        await newStudent.save();
        res.status(200).json({ message: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await StudentModel.findOne({ _id: req.params.id });
        if (!student) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await StudentModel.findOneAndDelete({ _id: req.params.id });
        if (!student) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const student = await StudentModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ message: "Data updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;