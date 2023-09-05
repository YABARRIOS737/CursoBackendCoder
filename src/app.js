import express from "express";
import __dirname from "./utils.js"
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import ProductManager from "./dao/ProductManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import mongoose from "mongoose";

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
app.use(express.urlencoded({ extended: true }));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter)
app.use("/", viewsRouter);

mongoose.connect("mongodb+srv://barrioslafont5:25680471yY-@codespacecluster.hc9cjzi.mongodb.net/ecommerce?retryWrites=true&w=majority");

socketServer.on("connection", async (socket) => {
    console.log("Nueva Conexión!");

    /* socket.broadcast.emit("nuevaConexion", "Hay un nuevo Usuario conectado!");

    socket.on("nuevoUsuario", (data) => {
        socket.broadcast.emit("nuevoUsuario", data + " se ha conectado!");
    });

    socket.on("message", (data) => {
        messages.push({usuario:data.usuario, foto:data.foto, mensaje:data.mensaje});
        socket.emit("messages", messages);
    }); */

    try {
        const products = await productManager.getProducts({});
        socket.emit("realTimeProducts", products);

        socket.on("nuevoProducto", async (data) => {
            try {
                await productManager.addProduct({
                    title: data.title,
                    description: "",
                    code: "",
                    price: data.price,
                    status: "",
                    stock: 100,
                    category: "",
                    thumbnails: data.thumbnails
                });

                const updatedProducts = await productManager.getProducts({});
                socket.emit("realTimeProducts", updatedProducts);
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });

        socket.on("eliminarProducto", async (data) => {
            try {
                await productManager.deleteProduct(parseInt(data));
                const updatedProducts = await productManager.getProducts({});
                socket.emit("realTimeProducts", updatedProducts);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});
