import express from "express";
import ProductManager from "../ProductManager.js"

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts(); // Esperar a que la promesa se resuelva
        res.render("home", { products });
    } catch (error) {
        console.error("Error getting products:", error);
        // Manejar el error y responder apropiadamente
        res.status(500).send("Error getting products");
    }
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;
