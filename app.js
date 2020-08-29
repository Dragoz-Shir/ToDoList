const express = require("express");
const bodyP = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = ["Comprar comida", "Prepara la comida", "Comer :3"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyP.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("I'm alive at port 3000");
});

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { pageTitle: day, addItem: items });
});

app.post("/", function (req, res) {
  //console.log(req.body.entrada);
  let item = req.body.entrada;
  let title = req.body.boton;

  if (title === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/");
  }

  //res.send("PAso");
});

app.get("/work", function (req, res) {
  res.render("list", { pageTitle: "Work", addItem: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.entrada;
  workItems.push(item);
  res.redirect("/work");
});
