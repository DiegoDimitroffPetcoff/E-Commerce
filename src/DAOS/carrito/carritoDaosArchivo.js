const fs = require("fs");
const express = require("express");
const app = express();
const cart = express.Router();
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

const { ContenedorArchivo } = require("../../contenedores/contenedorArchivos");

class CarritoDaosArchivos extends ContenedorArchivo {
  constructor() {
    super("./carrito/cartStorage.txt");
  }
}
const carrito = new CarritoDaosArchivos();
console.log(carrito.read());

cart.get("/", (req, resp) => {
  resp.json({ productos: carrito.read()});
});

module.exports = cart;