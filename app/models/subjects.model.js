const mongoose = require("mongoose");

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subject_name: {
            type: String,
            required: true
        },
        subject_code: {
            type: String,
            unique: true,
            default: new mongoose.Types.ObjectId()
        },
    })
);

module.exports = Subject;