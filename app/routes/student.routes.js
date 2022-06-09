const controller = require('../controllers/student.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/student/create', controller.createStudent);

    app.get('/api/student/all', controller.fetchAllStudents);

    app.post('/api/student/addSubject', controller.addSubjectToStudent);
}