const fs = require("fs");
const express = require("express");
const app = express();
const router = express.Router();
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

const { ContenedorArchivo } = require("../../contenedores/contenedorArchivos");

class ProductosDaosArchivos extends ContenedorArchivo {
  constructor() {
    super("./productStorage.txt");
  }
}
const productos = new ProductosDaosArchivos();

router.get("/", (req, resp) => {
  resp.json({ productos: productos.read()});
});

module.exports = router;


