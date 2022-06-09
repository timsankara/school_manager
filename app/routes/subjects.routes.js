const controller = require('../controllers/subjects.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/subjects/create', controller.createSubject);

    app.get('/api/subjects/all', controller.fetchAllSubjects);
}