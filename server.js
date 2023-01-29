const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./db/config");
const UserRoute = require("./routes/userRoute")
var cors = require("cors");
const morgan = require("morgan");
const BASE_URL = "/api/v1"

const app = express();
app.use(express.json());
dotenv.config();
ConnectDB();

app.use(morgan("combined"));

const PORT = process.env.PORT || 5000;

app.use(cors())

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});



app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use(`${BASE_URL}/users`, UserRoute);

