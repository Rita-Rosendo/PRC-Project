const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const db = require("./db.js");
const config = require('./config.js')

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: `http://${config.frontend.host}:${config.frontend.port}`
}));

require("./routes/auth.routes")(app);
require("./routes/hotels.routes")(app);

db.mongoose
  .connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(config.app.port, () =>{
      console.log(`Successfully connect to MongoDB. Server is running on port ${config.app.port}.`)
    });
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });