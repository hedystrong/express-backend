const { request, response } = require("express");
const express = require("express");
const app = express();
const port = 9000;
const cors = require("cors");
const fs = require("fs")
const { json } = require("body-parser")
const uuid = require("uuid");



app.use(cors());
app.use(json());

const file = "./users.json";
const uniqueRandomID = uuid.v4()


app.post("/users", (req, res) => {
    const body = req.body;

    console.log(req.body);

    fs.readFile(file, "utf-8", (readErr, data) => {
        if (readErr) {
            res.json({ status: "false", message: readErr });
        }
        const obj = JSON.parse(data);

        const newUser = {
            id: uniqueRandomID,
            name: "Bold",
        };
        obj.push(newUser);

        fs.writeFile(file, JSON.stringify(obj), (err) => {
            if (err) {
                res.json({ status: true, result: obj });
            }

            res.json({ status: true, result: obj });
        });
    });
});




app.get("/users", (request, response) => {
    fs.readFile("./users.json", "utf-8", (readError, data) => {
        let savedData = JSON.parse(data);
        if (readError) {
            response.json({
                status: "read file error",
            });
        }
        response.json({
            status: "success",
            data: savedData,
        });
    });
});

app.post("/user", (request, response) => {
    const body = request.body;
    fs.readFile("./data/user.json", "utf-8", (readError, data) => {
        let savedData = JSON.parse(data);
        if (readError) {
            response.json({
                status: "read file error",
            });
        }

        const newUser = {
            id: Date.now().toString(),
            username: body.username,
            age: body.age,
        };

        savedData.push(newUser);

        fs.writeFile(
            "./users.json",
            JSON.stringify(savedData),
            (writeError) => {
                if (writeError) {
                    response.json({
                        status: "error",
                    });
                } else {
                    response.json({
                        status: "success",
                        data: savedData,
                    });
                }
            }
        );
    });
});


app.delete("/user", (req, res) => {
    const body = req.body;

    console.log(body);
    fs.readFile("./users.json", "utf-8", (readError, data) => {
        let savedData = JSON.parse(data);
        if (readError) {
            res.json({
                status: "read file error",
            });
        }
        const deleteData = savedData.filter((d) => d.id !== body.id);

        fs.writeFile(
            "./users.json",
            JSON.stringify(deleteData),
            (writeError) => {
                if (writeError) {
                    res.json({
                        status: "error",
                        message: writeError
                    });
                }

                res.json({ status: "true", result: deleteData })
            }
        )
    })
})

app.put("/user", (requist, response) => {
    const body = request.body;
    fs.readFile("./users.json", "utf-8", (readError, data) => {
        let savedData = JSON.parse(data);
        if (readError) {
            response.json({
                status: "read file error",
            });
        }
        const updateData = savedData.map((e) => {
            if (e.id === body.id) {
                (e.name = body.name), (e.id = body.id);
            }
            return e;
        });
        fs.writeFile(
            "./users.json",
            JSON.stringify(updatedData),
            (writeError) => {
                if (writeError) {
                    response.json({
                        status: "error",
                    });
                } else {
                    response.json({
                        status: "success",
                        data: updatedData,
                    });
                }
            }
        );
    })
})


app.listen(port, () => {
    console.log("Server is running on " + port);
});