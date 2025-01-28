const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config()

const PORT = 3000
// to make a database lines 13-21





const Schema = mongoose.Schema

const ToDoSchema = new Schema(
    {

        todo: String   ,
        created:  Number

    }
)
const ToDo = mongoose.model('ToDo', ToDoSchema)



app.get("/test", (req, res) => {
    console.log("Test route hit")
    res.json({ msg: "success" })
})

app.get("/getTodos", (req, res) => {
    console.log("getTodos HIT")
    ToDo.find()
        .then(found => {
            console.log("Found", found)
            res.json(found)
        })
})

app.post("/create", (req, res) => {
    console.log("Create Route HIT", req.body)
    ToDo.create(req.body)
        .then(created => {
            console.log("created", created)
            res.json(created)
        })
})

app.delete("/delete/:id", (req, res) => {
    console.log("Delete Hit", req.params.id)
    ToDo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("deleted", deleted)
            res.json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

app.delete("/delete/:id", async (req, res) => {
    console.log("Delete route hit")
    await ToDo.findByIdAndDelete(req.params.id);
    res.json({message: "Todo deleted"});
});

app.put("/update/:id", async (req, res) => {
    const updatedTodo = await ToDo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedTodo);
});



app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch(err => console.log(err))

        .catch(err => console.log(err))

    console.log(`Server is runnning on port ${PORT}`)
})