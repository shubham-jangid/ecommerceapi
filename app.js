require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//connecting to DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch(() => {
    Console.log("DB OOOPS");
  });

app.get("/", (req, res) => {
  res.send("djklfj");
});

// Routing
app.use("/api", authRoute);
app.use("/api", userRoute);

//Setting the PORT
const port = process.env.PORT || 8000;

// listening to PORT
app.listen(port, () => {
  console.log(`listening at https://localhost:${port}`);
});
