const mongoose = require("mongoose")

const Student = mongoose.model(
    "Student",
    new mongoose.Schema({
        // email: String,
        first_name: String,
        last_name: String,
        subjects_array: {
            type: Array,
            default: []
        }
    })
);

module.exports = Student;