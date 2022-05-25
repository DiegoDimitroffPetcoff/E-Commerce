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
}



module.exports = { ContenedorArchivo };
