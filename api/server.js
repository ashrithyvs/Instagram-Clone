require("dotenv").config();

var express = require("express");
const cors = require("cors");
var path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
var cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const multer = require("multer");
const mongodb = require("mongodb");
const { Readable } = require("stream");
const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;

const app = express();

// MongoClient.connect(process.env.MONGO_URI, (err, database) => {
//   if (err) {
//     console.log("MongoDB Connection Error");
//     process.exit(1);
//   }
//   db = database;
//   console.log("MongoDB connected");
// });

connectDB();

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

let db;
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
});

require("./routes")(app);

// app.post("/upload", (req, res) => {
//   upload.single("photo")(req, res, (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "Upload Request Validation Failed" });
//     } else if (!req.body.file[0].name) {
//       return res.status(400).json({ message: "No photo name in request body" });
//     }

//     let photoName = req.body.file[0].name;

//     // Covert buffer to Readable Stream
//     const readablePhotoStream = new Readable();
//     readablePhotoStream.push(req.file.buffer);
//     readablePhotoStream.push(null);

//     let bucket = new mongodb.GridFSBucket(db, {
//       bucketName: "photos",
//     });

//     let uploadStream = bucket.openUploadStream(photoName);
//     let id = uploadStream.id;
//     readablePhotoStream.pipe(uploadStream);

//     uploadStream.on("error", () => {
//       return res.status(500).json({ message: "Error uploading file" });
//     });

//     uploadStream.on("finish", () => {
//       return res.status(201).json({
//         message:
//           "File uploaded successfully, stored under Mongo ObjectID: " + id,
//       });
//     });
//   });
// });

app.use(function (req, res, next) {
  res.status(404).send({ error: "Route not found" });
});
const port = 4001;

app.listen(port, () => {
  console.log("Server listening on " + "http://localhost:" + port);
});

module.exports = app;
