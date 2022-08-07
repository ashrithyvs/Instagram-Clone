require("dotenv").config();

var express = require("express");
const cors = require("cors");
var path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
var cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

connectDB();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ extended: true, limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// const authorizeAccessToken = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 50,
//     jwksUri: `https://${process.env.AUTH0_CLIENT_DOMAIN}/.well-known/jwks.json`,
//   }),
//   audience: process.env.AUTH0_CLIENT_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_CLIENT_DOMAIN}/`,
//   algorithms: ["RS256"],
// });

require("./routes")(app);

app.use(function (req, res, next) {
  res.status(404).send({ error: "Route not found" });
});

const port = 4001;

app.listen(port, () => {
  console.log("Server listening on " + "http://localhost:" + port);
});

module.exports = app;
