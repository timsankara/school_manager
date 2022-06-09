const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const app = express();


// app.use(cors(corsOptions));
app.use(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
});

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(
    // `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    "mongodb+srv://tim:u8HawxxD7d6Vz5Y5@cluster0.dbmdv.mongodb.net/?retryWrites=true&w=majority"
    , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/subjects.routes")(app);

// serve the index.html in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')))

    app.get('*', function(_, res) {
      res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
    })
}

// set port, listen for requests
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
