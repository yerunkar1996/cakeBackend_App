const express = require("express");
const app = express();
//cors policy
const cors = require("cors");
app.use(cors());


//Port Env setup
const port = process.env.port  || 4500

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

//Body-Parser
// const bodyParser = require('body-parser')
// router.use(bodyParser.json())
// router.use(bodyParser.json({limit: "50mb"}));
// router.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Connect to MongoDB Database
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.rjiuf.mongodb.net/Cakeshop?retryWrites=true&w=majority",
    {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected successfully!");
  });

//By default router
app.get("/", (req, res) => {
  res.send(
    "<h1 style='color:coral; background-color:black;padding:10px;'>Welcome to Backend Server</h1>"
  );
});

// Cakes api
const cakesrouter = require('./routes/cakesroute')
app.use('/cakes',cakesrouter)

// Cookies api
const cookiesrouter = require("./routes/cookieroute");
app.use("/cookies", cookiesrouter);

// Snacks api
const snakcsrouter = require("./routes/snacksroute");
app.use("/snacks", snakcsrouter);

app.listen(port, () => {
  console.log("Server is listening on 4500 port!");
});

