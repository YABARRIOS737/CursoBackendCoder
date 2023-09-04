import express from "express";
import ProductManager from "../dao/ProductManager.js"
//import { __dirname } from "../utils.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).send("Error getting products");
    }
});



router.get("/realtimeproducts", (req, res) => {
        res.render("realTimeProducts");

});

export default router;
