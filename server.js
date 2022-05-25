const fs = require("fs");
const express = require("express");
const { log } = require("console");

const { Router } = express;
// --------------------------------------------------------
const app = express();
const handlebars = require("express-handlebars")
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("./public"));







const multer = require("multer");
const { nextTick } = require("process");

const frontHome = Router();
const productos = Router();
const carrito = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/home", frontHome);
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);


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

// class ContainerProduct {
//   constructor() {
//     this.route = "./productStorage.txt";
//     this.id = 1;
//   }

//   read() {
//     let readFinal = fs.readFileSync(this.route, "utf-8");
//     let allProducts = JSON.parse(readFinal);
//     if (allProducts.length == 0) {
//       return (allProducts = "No Products founds");
//     }
//     return allProducts;
//   }

//   getById(x) {
//     let array = [];
//     let y = x;
//     try {
//       let data = fs.readFileSync(this.route, "utf-8");
//       array = JSON.parse(data);
//     } catch {
//       console.log("catch error");
//     }
//     let object = null;

//     array.forEach((element) => {
//       if (element.id == y) {
//         object = element;
//       }
//     });

//     if (object == null) {
//       object = "Error, product not found";
//     }
//     return object;
//   }

//   save(x) {
//     let array = [];
//     let object = x;

//     try {
//       let data = fs.readFileSync(this.route, "utf-8");
//       array = JSON.parse(data);
//     } catch {
//       console.log("catch error");
//     }
//     object.id = array.length + 1;
//     // object.timestamp = new Date();
//     object.Timestamp = new Date();
//     object.Timestamp += object.Timestamp.getTime();
//     array.push(object);

//     let lastId = array.length + 1;
//     fs.writeFileSync(this.route, JSON.stringify(array));
//     this.id = lastId++;
//     return object;
//   }

//   deleteById(x) {
//     let array = [];
//     let y = x;
//     try {
//       let data = fs.readFileSync(this.route, "utf-8");
//       array = JSON.parse(data);
//       console.log("Ingreso por TRY");
//     } catch {
//       console.log("catch error");
//     }

//     array.forEach((element) => {
//       if (element.id == y) {
//         let id = element.id - 1;
//         let removed = array.splice(id, 1);
//         console.log("ELEMENTO ELIMINADO: " + JSON.stringify(removed));
//         fs.writeFileSync(this.route, JSON.stringify(array));
//         console.log(array);
//       }
//     });
//     return "You just deleted product with Id Number: " + x;
//   }

//   edit(id, nombre, price, descripcion, foto, stock) {
//     let y = id;
//     let readFinal = fs.readFileSync(this.route, "utf-8");
//     let allProducts = JSON.parse(readFinal);

//     console.log(allProducts);

//     allProducts.forEach((element) => {
//       if (element.id == y) {
//         if (nombre !== "") {
//           element.title = nombre;
//         }

//         if (price !== "") {
//           element.price = price;
//         }

//         if (descripcion !== "") {
//           element.descripcion = descripcion;
//         }

//         if (foto !== "") {
//           element.foto = foto;
//         }

//         if (stock !== "") {
//           element.stock = stock;
//         }

//         element.ModificatedTimestamp = new Date();
//         element.ModificatedTimestamp += element.ModificatedTimestamp.getTime();
//       }
//     });
//     console.log(allProducts);
//     fs.writeFileSync(this.route, JSON.stringify(allProducts));
//     return allProducts[id - 1];
//   }

//   ramdom() {
//     let data = fs.readFileSync(this.route, "utf-8");
//     let allProducts = JSON.parse(data);
//     let arrayAll = allProducts;
//     let aleatorio = arrayAll[Math.floor(Math.random() * arrayAll.length)];
//     return aleatorio;
//   }
// }

// const containerProduct = new ContainerProduct();

// ----------------------------------------------------------------


// PRODUCTOS______________

productos.use('/',require('./src/DAOS/productos/productosDaosArchivos'))

// CARRITO______________

carrito.use('/',require('./src/DAOS/carrito/carritoDaosArchivo'))








// router.get("/", (req, resp) => {
//   resp.json({ AllProducs: containerProduct.read() });
// });

// router.get("/:num", (req, res) => {
//   res.json(containerProduct.getById(req.params.num));
// });





// router.post("/", (req, res) => {
//   res.send({ ProductSaved: containerProduct.save(req.body) });
// });

// router.put("/:num", (req, resp) => {
//   resp.json({
//     EditedProduct: containerProduct.edit(
//       req.params.num,
//       req.body.title,
//       req.body.price,
//       req.body.descripcion,
//       req.body.foto,
//       req.body.stock
//     ),
//   });
// });

// router.delete("/:num", (req, resp) => {
//   resp.json({ ProductDeleted: containerProduct.deleteById(req.params.num) });
// });

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
      return (allProducts = "No Products New found in the cart");
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
        array.splice(element.id - 1, 1);

     fs.writeFileSync(this.route, JSON.stringify(array));
     
      } else {
        console.log("No Element Founded");
        return "No Element Founded";
      }
    });
    return "You just deleted cart with Id Number: " + x;
  }

  deleteProducInTheCart(cart, product) {
    let array = [];
    let y = cart;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
      console.log("Ingreso por TRY");
    } catch {
      console.log("catch error");
    }

    array.forEach((element) => {
      if (element.id == y) {
        let allProducts = element.products;

        allProducts.forEach((element) => {
          if (element.id == product) {
            allProducts.splice(element.id - 1, 1);
          }
        });

        fs.writeFileSync(this.route, JSON.stringify(array));
      }
    });

    return `Product Eliminate successfully`;
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
  }
}
const containerCart = new ContainerCart();

//-----------------------------------------------------------
// routerCart.get("/:num/producto", (req, resp) => {
//   resp.json( {
//     ProductsInTheCart: containerCart.readProductInTheCart(req.params.num),
//   });
// });

// routerCart.get("/", (req, resp) => {
//   resp.json({ AllCartsAvailable: containerCart.readCart() });
// });

// routerCart.get("/:num", (req, res) => {
//   res.json(containerCart.getById(req.params.num));
// });

// routerCart.post("/nuevoCarrito", (req, res) => {
//   res.send({ CartCreated: containerCart.save(req.body) });
// });

// routerCart.post("/:num", (req, res) => {
//   // UBICO EL PRODUCTO QUE QUIERO AGREGAR
//   let productById = containerProduct.getById(req.body.productID);

//   // cart : es el carro con el producto agrgado...
//   let resultado = containerCart.edit(req.params.num, productById);

//   res.json({ ProductAdded: productById });
// });



// routerCart.delete("/:num", (req, resp) => {

//   let respond = containerCart.deleteById(req.params.num)
//   resp.json({ CartEliminate: respond });
// });


// routerCart.delete("/:num/productos/:id_prod", (req, resp) => {
//   containerCart.deleteProducInTheCart(req.params.num, req.params.id_prod);

//   resp.json({
//     CartEliminate: containerCart.deleteProducInTheCart(),
//   });
// });



// __________________________________________________________________

frontHome.get("/", (req, resp) => {
  console.log(containerProduct.read());

  resp.render('main', {AllProducs: containerProduct.read() });
});

frontHome.get("/client", (req, resp) => {
  console.log(containerProduct.read());
  resp.render('carts', {AllProducs: containerProduct.read() });
});


frontHome.get("/client/:num", (req, res) => {
  let objeto = containerCart.getById(req.params.num);
console.log(objeto);

  res.render('carts-product', {ProductsInTheCart: containerCart.getById(req.params.num)  });
});





// ESTE GET ES PARA EL ADMINISTRADOR PARA QUE VEA TODOS LOS CARRITOS Y QUE PROD TIENE CADA UNO. OJOO!!!!
// frontHome.get("/administrator/cart", (req, resp) => {
//   resp.render('main', {AllCartsAvailable: containerCart.readCart() });
// });