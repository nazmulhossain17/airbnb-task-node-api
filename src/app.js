const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const propertyRoutes = require("./routes/propertyRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
// const { port } = require("./config");
const port = 5000;
const app = express();

// Define CORS options
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/properties", propertyRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
