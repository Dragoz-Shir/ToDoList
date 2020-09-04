const express = require("express");
const bodyP = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyP.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const itemSchema = {
  name: {
    type: String,
    require: true,
  },
};
const Item = mongoose.model("Item", itemSchema);

const item = new Item({
  name: "¡Bienvenido al TodoList!",
});
const item1 = new Item({
  name: "Agrega tareas con el boton de +",
});
const item2 = new Item({
  name: "<- click para borrar un item",
});

app.listen(3000, function () {
  console.log("I'm alive at port 3000");
});

app.get("/", function (req, res) {
  Item.find(function (e, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany([item, item1, item2], function (e) {
        if (e) {
          console.log("Error al insertar");
        } else {
          console.log("Todo excelentet al insertar");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { pageTitle: "Today", addItem: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  //console.log(req.body.entrada);
  const itemName = req.body.entrada;
  // let title = req.body.boton;
  const item = new Item({
    name: itemName,
  });
  item.save();

  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { pageTitle: "Work", addItem: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.entrada;
  workItems.push(item);
  res.redirect("/work");
});
