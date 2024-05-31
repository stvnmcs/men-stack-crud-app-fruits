const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require("express");

const mongoose = require("mongoose");


const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


const Fruit = require("./models/fruit.js");

app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits);
    res.render("fruits/index.ejs", { fruits: allFruits });
});
  
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
