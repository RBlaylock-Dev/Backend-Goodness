const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Access to the req.body

const PORT = 3000;

const Schema = mongoose.Schema;
const ToDoSchema = new Schema(
    {
     todo: String,
     created: Number
    }
);

const ToDo = mongoose.model("ToDo", ToDoSchema);



app.get("/test", (req, res) => {
    console.log("Test route hit");
    res.json({ msg: "success"})
});

app.get("/getTodos", (req, res) => {
    console.log("getTodos route hit");
    ToDo.find()
    .then(found => {
        console.log("Found", found);
        res.json(found);
    })
    .catch(err => console.log(`this is a ${err}`));
});

app.post("/create", (req, res) => {
    console.log("Create route hit", req.body)
    ToDo.create(req.body)
    .then(created => {
        console.log("Created", created)
        res.json(created)
    })
    .catch(err => console.log(err))
})

app.delete("/delete/:id", (req, res) => {
    console.log("Delete route hit", req.params.id)
    ToDo.findByIdAndDelete(req.params.id)
    .then(deleted => {
        console.log("Deleted", deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err))
})

app.put("/update/:id", (req, res) => {
    console.log("Update route hit", req.params.id)
    ToDo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updated => {
        console.log("Updated", updated)
        res.json(updated)
    })
    .catch(err => console.log(err))
})

// app.put("/edit/:id:", (req, res) => {
//     console.log("edit hit", req.params, req.body)
//     ToDo.findByIdAndUpdate(req.params.id)
//     .then(found => {
//         console.log("found", found)
//         found.todo = req.body.todo
//         found.save()
//     })
// })

//Conect to MongoDB
app.listen(PORT, () => {

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to Database")
})
.catch(err => console.log(err))

    console.log(`Server is running on port:  ${PORT}`);
})