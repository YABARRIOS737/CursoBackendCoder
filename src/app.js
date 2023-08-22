import express from "express";
import __dirname from "./utils.js"
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import {Server} from "socket.io";
import ProductManager from "./ProductManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const puerto = 8080;
const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);
const productManager = new ProductManager();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products/", productsRouter);
app.use("/api/carts/",cartsRouter)
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
    console.log("Nueva Conexión!");

    /* socket.broadcast.emit("nuevaConexion", "Hay un nuevo Usuario conectado!");

    socket.on("nuevoUsuario", (data) => {
        socket.broadcast.emit("nuevoUsuario", data + " se ha conectado!");
    });

    socket.on("message", (data) => {
        messages.push({usuario:data.usuario, foto:data.foto, mensaje:data.mensaje});
        socket.emit("messages", messages);
    }); */
    const productManager = new ProductManager();
    const products = productManager.getProducts();
    socket.emit("realTimeProducts", products);
});