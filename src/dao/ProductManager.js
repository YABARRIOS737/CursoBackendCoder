//import mongoose from "mongoose";
import { Model } from "mongoose";
import { productModel } from "./models/product.model.js";

export default class ProductManager {
    constructor(path) {
        this.products = [];
    }

    async addProduct(product) {
        try {
            if (this.validateCode(product.code)) {
                console.log("Error! file CODE exists already!");
                return false;
            } else {
                const producto = { title: product.title, description: product.description, code: product.code, price: product.price, status: product.status, stock: product.stock, category: product.category, thumbnails: product.thumbnails };
                productModel.create(producto)
                console.log("Product added!");

                return true;
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    async updateProduct(id, product) {
        // try {
        //     this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        //     let pos = this.products.findIndex(item => item.id === id);

        //     if (pos > -1) {
        //         this.products[pos].title = product.title;
        //         this.products[pos].description = product.description;
        //         this.products[pos].code = product.code;
        //         this.products[pos].price = product.price;
        //         this.products[pos].status = product.status;
        //         this.products[pos].stock = product.stock;
        //         this.products[pos].category = product.category;
        //         this.products[pos].thumbnails = product.thumbnails;
        //         await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        //         console.log("Product updated!");
        productModel.updateOne({_id:id }, product);
        console.log("Product updated");

        return true;
    }

    async deleteProduct(id) {
        try {
            this.products = this.getProducts();
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            let pos = this.products.findIndex(item => item.id === id);

            if (pos > -1) {
                this.products.splice(pos, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product #" + id + " deleted!");

                return true;
            } else {
                console.log("Product not found");

                return false;
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    async getProducts() {
        return await productModel.find().lean();
        // try {
        //     const products = await productModel.find();

        // } catch (error) {
        //     console.error("Error getting products:", error);
        //     return [];
        // }
        // this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        //     return this.products;
    }

    async getProductById(id) {
        return productModel.find({ id: id }).lean();
    }

    validateCode(code) {
        return productModel.find({ code: code }).lean();
    }

    generateId() {
        let max = 0;
        this.products.forEach((item) => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max + 1;
    }

}

/*(async () => {
    const PM = new ProductManager();
    console.log(await PM.getProducts());
    await PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 25 });
    console.log(await PM.getProducts());
    await PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 50 });
    await PM.addProduct({ title: "Curso Back-end-", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Back-end", stock: 100 });
    console.log(await PM.getProductById(3));
    console.log(await PM.getProductById(1));
    //await PM.deleteProduct(2);
    //await PM.updateProduct(2, { title: "Curso Fron-end VueJs", description: "Modalidad Online con tutorias", price: 500000, thumbnail: "No image", code: "Curso Fron-end VueJs", stock: 100 });
    console.log(await PM.getProducts());
})();
*/