const express = require("express");
const bodyP = require("body-parser");

const app = express();
var items = ["Comprar comida", "Prepara la comida", "Comer :3"];
app.set("view engine", "ejs");
app.use(bodyP.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("I'm alive at port 3000");
});

app.get("/", function (req, res) {
  var date = new Date();
  //var today = date.getDay();
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  var day = date.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, addItem: items });
});

app.post("/", function (req, res) {
  //console.log(req.body.entrada);
  var item = req.body.entrada;
  items.push(item);

  res.redirect("/");

  //res.send("PAso");
});
