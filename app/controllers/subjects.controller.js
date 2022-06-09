const SubjectModel = require('../models/subjects.model');

exports.createSubject = (req, res) => {
    let subject = req.body.subject
    SubjectModel.create(subject)
        .then((subject) => {
            res.json(subject)
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.fetchAllSubjects = (req, res) => {
    SubjectModel.find()
        .then((subjects) => {
            res.json(subjects)
        })
        .catch((err) => {
            res.json(err)
        })
}