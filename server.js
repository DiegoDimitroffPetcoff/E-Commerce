const fs = require("fs");
const express = require("express");
const { log } = require("console");
const { Router } = express;

const multer = require("multer");
const { nextTick } = require("process");

const app = express();
const router = Router();
const routerCart = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);
app.use("/api/carrito", routerCart);

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

// I desig the port, wich is gonna be 8080, and asign that port to be listened by server const
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Port " + server.address().port + " is listening right now");
});
// just in case the server fake, I put that messege
server.on("Error", (error) => console.log("error en servidor ${error}"));

// I set the Storage----------------------------------------------------------------
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

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

// _________________________________________________________________________

// _________________________________________________________________________

class ContainerCart {
  constructor() {
    this.route = "./cartStorage.txt";
    this.id = 1;
  }

  readCart() {
    let readFinal = fs.readFileSync(this.route, "utf-8");
    let allProducts = JSON.parse(readFinal);
    console.log(allProducts);

    if (allProducts.length == 0) {
      return (allProducts = "No Carts founds");
    }
    return allProducts;
  }

  readProductInTheCart(id) {
    let readFinal = fs.readFileSync(this.route, "utf-8");
    let allProducts = JSON.parse(readFinal);
    console.log(allProducts);

    if (allProducts[id] == undefined) {
      return (allProducts = "No Products wew found in the cart");
    }
    return allProducts[id - 1].products;
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
    object.products = [];
    array.push(object);

    let lastId = array.length + 1;
    fs.writeFileSync(this.route, JSON.stringify(array));
    this.id = lastId++;
    return object;
  }

  // saveCart(x) {
  //   let array = [];
  //   let object = x;

  //   try {
  //     let data = fs.readFileSync(this.route, "utf-8");
  //     array = JSON.parse(data);
  //   } catch {
  //     console.log("catch error");
  //   }

  //   object.id = array.length + 1;
  //   // object.timestamp = new Date();
  //   object.Timestamp = new Date();
  //   object.Timestamp += object.Timestamp.getTime();

  //   array.push(object);

  //   let lastId = array.length + 1;
  //   fs.writeFileSync(this.route, JSON.stringify(array));
  //   this.id = lastId++;
  //   return object;
  // }

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
    return "You just deleted cart with Id Number: " + x;
  }

  edit(id, product) {
    let y = id;
    let readFinal = fs.readFileSync(this.route, "utf-8");
    let allProducts = JSON.parse(readFinal);

    allProducts.forEach((element) => {
      if (element.id == y) {
        // if (element.products.length !== 1 ){

        // element.products =[] YA TIENE QUE VENIR DEFINIDO DESDE EL STORAGE
        element.products.push(product);

        console.log("CART GUARDADOS DESP DE LA ITERACION");
        console.log(allProducts);
        // }
      }
      fs.writeFileSync(this.route, JSON.stringify(allProducts));
      return allProducts[id - 1];
    });

    return allProducts;
  }
}
const containerCart = new ContainerCart();

//-----------------------------------------------------------

routerCart.get("/", (req, resp) => {
  resp.json({ AllCartsAvailable: containerCart.readCart() });
});

routerCart.get("/:num", (req, res) => {
  res.json(containerCart.getById(req.params.num));
});

routerCart.post("/nuevoCarrito", (req, res) => {
  res.send({ CartCreated: containerCart.save(req.body) });
});


routerCart.post("/:num", (req, res) => {
  // UBICO EL PRODUCTO QUE QUIERO AGREGAR
  let productById = containerProduct.getById(req.body.productID);

  // cart : es el carro con el producto agrgado...
  let resultado = containerCart.edit(req.params.num, productById);

  res.json({ ProductAdded: productById });
});

routerCart.get("/:num/productos", (req, resp) => {
  resp.json({ ProductsInTheCart: containerCart.readProductInTheCart(req.params.num) });
});



// ------------------------------------------------------------------

// routerCart.delete("/:num", (req, resp) => {
//   resp.json({ CartEliminate: containerCart.deleteById(req.params.num) });
// });

