const express = require("express");
const cors = require("cors");
const json = require("body-parser");

const port = 8080;
const app = express();

app.use(cors());

app.get("/", (request, response) => {
    const { id } = request.query;

    console.log("/intro");

    console.log("hello", id);
    response.json({ status: true, result: [{ id: 1, name: "Hello" }] });
});

app.get("/add", (request, response) => {
    const { a, b } = request.query;

    let result = Number(a) + Number(b);
    response.json({ value: result });

});

app.get("/multi", (request, response) => {
    const { a, b } = request.query;

    let result = Number(a) * Number(b);
    response.json({ value: result });

});

app.get("/hasah", (request, response) => {
    const { a, b } = request.query;

    let result = Number(a) - Number(b);
    response.json({ value: result });

});

app.get("/huwaah", (request, response) => {
    const { a, b } = request.query;

    let result = Number(a) / Number(b);
    response.json({ value: result });

});

// app.get("/clear", (request, response) => {
//     const { a, b } = request.query;
//     let result = Number(a, b == 0)
//     response.json({ value: result });
// });

app.get("/api", (request, response) => {
    const { id } = request.query;
    console.log("api is running");
    response.json({ status: true });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
