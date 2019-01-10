const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();
app.set("view engine", "hbs");

// hps configrations
hbs.registerPartials(__dirname + "/views/partials");

// global function and passing data
hbs.registerHelper("screamIt", greeting => {
  return greeting.toUpperCase();
});
// global function to all components
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} : ${req.method} ${req.url}  `;
  console.log("Server Log", log);
  fs.appendFileSync("server.log", log + "\n");

  next();
});

// coming soon for all page
app.use((req, res, next) => {
  res.render("loading.hbs");
});

// config home page
app.get("/", (req, res) => {
  res.render("home.hbs", {
    welcomeMessage: "Hello To Express js"
  });
});

// config about page
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "this is about page"
  });
});

// bublic html file
app.use(express.static(__dirname + "/pubilc"));

app.listen(8000);
