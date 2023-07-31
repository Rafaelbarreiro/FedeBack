const {conectarDB} = require ('./db.js')
const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors")
const app = express();

const articlesRoute = require('./routes/articlesRoute');
const comunicationsRoute = require ('./routes/comunicationsRoute');
const donationRoute = require ('./routes/donationRoute.js');
const emailRoute = require ('./routes/emailRoute');
const eventsRoute = require ('./routes/eventsRoute');
const populateRoute = require ('./routes/populateRoute');
const server = express();
const morgan = require("morgan");




dotenv.config();
conectarDB();
app.use(express.json());

app.use(
    cors({
      origin: '*',
      credentials: true,
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'authorization',
      ],
    })
  );
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Routing
//app.use("/users", userRoute);
app.use("/populate", populateRoute);
app.use("/events", eventsRoute);
app.use("/articles", articlesRoute);
app.use("/comunications", comunicationsRoute);
app.use("/email", emailRoute);
app.use("/donations", donationRoute);

const PORT = process.env.PORT || 3001;
const servidor = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
  });
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
