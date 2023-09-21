const mongoose= require("mongoose")


const todoschema = new mongoose.Schema({
    title: String,
    text: String
})

const todoModel = mongoose.models.todo_tbs || mongoose.model("todo_tbs", todoschema)

module.exports = todoModel