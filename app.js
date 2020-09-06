const express = require("express");
const bodyP = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
const defaultItems = [item, item1, item2];
app.listen(3000, function () {
  console.log("I'm alive at port 3000");
});

app.get("/", function (req, res) {
  Item.find(function (e, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (e) {
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
  const listName = req.body.boton;
  const itemName = req.body.entrada;
  // let title = req.body.boton;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (e, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});
app.post("/delete", function (req, res) {
  const itemCheckId = req.body.checkbox;
  const listName = req.body.pageTitle;
  if (listName === "Today") {
    Item.findByIdAndRemove(itemCheckId, function (e) {
      if (!e) {
        console.log("se borro el id correcto");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName }, // lista a buscar
      { $pull: { items: itemCheckId } }, //eliminando con el metodo pull, que solo aplica a los arrays
      function (e, foundItem) {
        if (!e) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});
/*
app.get("/work", function (req, res) {
  res.render("list", { pageTitle: "Work", addItem: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.entrada;
  workItems.push(item);
  res.redirect("/work");
});
*/

const listSchema = {
  name: String,
  items: [itemSchema],
};
const List = mongoose.model("List", listSchema);

app.get("/:paramsName", function (req, res) {
  const customListName = _.capitalize(req.params.paramsName);

  List.findOne({ name: customListName }, function (e, results) {
    if (!e) {
      if (results != null) {
        // console.log("Se encontro" + results);
        res.render("list", {
          pageTitle: customListName,
          addItem: results.items,
        });
      } else {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      }
    }
  });
});
