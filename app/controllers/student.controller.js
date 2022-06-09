const StudentModel = require("../models/student.model")

exports.createStudent = (req, res) => {
    let student = req.body.student
    StudentModel.create(student)
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.fetchAllStudents = (req, res) => {
    StudentModel.find()
        .then((students) => {
            res.json(students)
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.addSubjectToStudent = async (req, res) => {
    await StudentModel.findById(req.body.student_id)
        .then((student) => {
            console.log("student: ", student)
            student.subjects_array.push(req.body.subject)
            student.save()
                .then((student) => {
                    res.json(student)
                })
                .catch((err) => {
                    res.json(err)
                })
        })
}