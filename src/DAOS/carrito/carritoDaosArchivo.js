const fs = require("fs");
const express = require("express");
const app = express();
const router = express.Router();
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

const { ContenedorArchivo } = require("../../contenedores/contenedorArchivos");

class CarritoDaosArchivos extends ContenedorArchivo {
  constructor() {
    super("./cartStorage.txt");
  }
  
}
const carrito = new CarritoDaosArchivos();
const todo = carrito.read()
console.log(todo);

router.get("/", (req, resp) => {
  resp.json({ productos: todo});
});

module.exports = router;