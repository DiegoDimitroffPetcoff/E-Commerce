const express = require("express");
const app = express();
const { Router } = express;
const router = Router();

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

// app.use("/api/productos", './src/models/products.js');


class ContainerProduct {
    constructor() {
      this.route = "./productStorage.txt";
      this.id = 1;
    }
  
    read() {
      let readFinal = fs.readFileSync(this.route, "utf-8");
      let allProducts = JSON.parse(readFinal);
      if (allProducts.length == 0) {
        return (allProducts = "No Products founds");
      }
      return allProducts;
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
  
      if (object == null) {
        object = "Error, product not found";
      }
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
          console.log("ELEMENTO ELIMINADO: " + JSON.stringify(removed));
          fs.writeFileSync(this.route, JSON.stringify(array));
          console.log(array);
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
      console.log(allProducts);
      fs.writeFileSync(this.route, JSON.stringify(allProducts));
      return allProducts[id - 1];
    }
  
    ramdom() {
      let data = fs.readFileSync(this.route, "utf-8");
      let allProducts = JSON.parse(data);
      let arrayAll = allProducts;
      let aleatorio = arrayAll[Math.floor(Math.random() * arrayAll.length)];
      return aleatorio;
    }


  }
  
  const containerProduct = new ContainerProduct();
  
  // ----------------------------------------------------------------
  
  router.get("/", (req, resp) => {
    resp.json({ AllProducs: containerProduct.read() });
  });
  
  router.get("/:num", (req, res) => {
    res.json(containerProduct.getById(req.params.num));
  });
  
  router.post("/", (req, res) => {
    res.send({ ProductSaved: containerProduct.save(req.body) });
  });
  
  router.put("/:num", (req, resp) => {
    resp.json({
      EditedProduct: containerProduct.edit(
        req.params.num,
        req.body.title,
        req.body.price,
        req.body.descripcion,
        req.body.foto,
        req.body.stock
      ),
    });
  });
  
  router.delete("/:num", (req, resp) => {
    resp.json({ Eliminar: containerProduct.deleteById(req.params.num) });
  });


  module.exports.ContainerProduct = ContainerProduct;
  