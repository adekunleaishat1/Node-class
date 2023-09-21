const express = require("express")
const ejs = require("ejs");
const mongoose = require("mongoose");
const { text } = require("express");
const todoRoutes = require("./routes/todoroute");
require("dotenv").config()

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/todo", todoRoutes)

app.get("/", (req, res) => {
    res.send([
        { name: "Adewole", age: 1111, food: "Beans and bread" },
        { name: "Aishat", age: 1111, food: "Beans and bread" },
        { name: "Olu", age: 1111, food: "Rice and beans" },
        { name: "Comfort", age: 1111, food: "Ewa agoyin and bread" },
        { name: "Issac", age: 1111, food: "Beans and bread" },
        { name: "Samuel", age: 7, food: "Iyan and egusi" },


    ])
})

const signupschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    password: String,
})
const todoarray = []
let id

const signupModel = mongoose.models.signup_tbs || mongoose.model("signup_tbs", signupschema)
const signuparray = []


app.get("/html", (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html")
})


app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, phonenumber, password } = req.body
    try {
        const info = await signupModel.create({ firstname, lastname, email, phonenumber, password })
        if (!info) {
            return res.status(500).send({ messasge: "error saving to database", status: false })
        }
        console.log(info)
        res.redirect("/signup")
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", status: false })
    }
})
const uri = process.env.MONGODB_URI
const connect = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(uri).then((res) => {
        console.log("Database connected")
    }).catch((err) => {
        console.log(err)
    })
}

connect()

app.listen("3333", () => {
    console.log("Server started")
})
