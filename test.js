const express = require("express");
const cors = require("cors");
const json = require("body-parser");

const port = 8000;
const app = express();

let products = [
    { id: 1, productName: "Shoes" },
    { id: 2, productName: "Bags" },
    { id: 3, productName: "Animal" },
];

app.use(cors());
app.use(json());

app.get("/api", (request, response) => {
    response.json({ message: "Welcome to API" });

});

app.get("/products", (req, res) => {
    if (!products) res.json({ status: false, message: "not found" });

    if (products.length == 0) res.json({ status: true, message: "empty" });

    res.json({ status: true, result: products });

});

app.get("/product", (req, res) => {
    const { id } = req.query;

    if (!id) res.json({ status: false, message: "param id not found" });

    const newArr = products.filter((e) => e.id == id);
    if (newArr.length == 0) {
        res.json({ status: false, message: "product id oldsongui" });
    }
    res.json({ status: false, result: newArr[0] });
});

app.post("/product", (req, res) => {
    const { productName } = req.body;

    let id = products.length + 1;

    products.push({ id, productName });
    res.json({ status: true, result: products });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});