const fs = require("fs");
const express = require("express");
const app = express();
const { Router } = express;
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

class ContenedorArchivo {
  constructor(route) {
    this.route = route;
    this.id = 1;
  }

  read() {
    try {
      let readFinal = fs.readFileSync(this.route, "utf-8");
      let allProducts = JSON.parse(readFinal);
      if (allProducts.length == 0) {
        return (allProducts = "No Products founds");
      }

      return allProducts;
    } catch {
      console.log(`Hubo un error en la lectura del documento:${Error}`);
    }
  }
  getById(x) {
    let array = [];
    let y = x;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    let object = null;

    array.forEach((element) => {
      if (element.id == y) {
        object = element;
      }
    });
    return object;
  }

  save(x) {
    let array = [];
    let object = x;

    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    object.id = array.length + 1;
    // object.timestamp = new Date();
    object.Timestamp = new Date();
    object.Timestamp += object.Timestamp.getTime();
    array.push(object);

    let lastId = array.length + 1;
    fs.writeFileSync(this.route, JSON.stringify(array));
    this.id = lastId++;
    return object;
  }

  deleteById(x) {
    let array = [];
    let y = x;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
      console.log("Ingreso por TRY");
    } catch {
      console.log("catch error");
    }
    array.forEach((element) => {
      if (element.id == y) {
        let id = element.id - 1;
        let removed = array.splice(id, 1);
        fs.writeFileSync(this.route, JSON.stringify(array));
      }
    });
    return "You just deleted product with Id Number: " + x;
  }
  edit(id, nombre, price, descripcion, foto, stock) {
    let y = id;
    let readFinal = fs.readFileSync(this.route, "utf-8");
    let allProducts = JSON.parse(readFinal);

    console.log(allProducts);

    allProducts.forEach((element) => {
      if (element.id == y) {
        if (nombre !== "") {
          element.title = nombre;
        }

        if (price !== "") {
          element.price = price;
        }

        if (descripcion !== "") {
          element.descripcion = descripcion;
        }

        if (foto !== "") {
          element.foto = foto;
        }

        if (stock !== "") {
          element.stock = stock;
        }

        element.ModificatedTimestamp = new Date();
        element.ModificatedTimestamp += element.ModificatedTimestamp.getTime();
      }
    });

    fs.writeFileSync(this.route, JSON.stringify(allProducts));
    return allProducts[id - 1];
  }
}

module.exports = { ContenedorArchivo };
