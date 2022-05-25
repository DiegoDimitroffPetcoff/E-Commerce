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
  resp.json({ Productos: productos.read() });
});

router.get("/:num", (req, res) => {
  res.json({ Producto: productos.getById(req.params.num) });
});


router.post("/", (req, res) => {
  res.send({ ProductoGuardado: productos.save(req.body) });
});

router.delete("/:num", (req, resp) => {
  resp.json({ ProductoEliminado: productos.deleteById(req.params.num) });
});

router.put("/:num", (req, resp) => {
  resp.json({
    EditedProduct: productos.edit(
      req.params.num,
      req.body.title,
      req.body.price,
      req.body.descripcion,
      req.body.foto,
      req.body.stock
    ),
  });
});

module.exports = router;
