const todoModel = require("../models/todomodel")

const viewTodo =  async (req, res) => {
    try {
        const result = await todoModel.find({})
        if (!result) {
            return res.status(500).send({ messasge: "error fetching from database", status: false })
        }
        console.log(result)
        res.render("index", { todoarray: result })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ messasge: "Internal server error ", status: false })
    }
    // res.render("index", { todoarray: todoarray })
}

const createTodo =  async (req, res) => {
    console.log(req.body);
    const { title, text } = req.body
    try {
        // const todo = new todomodel({
        //     title,
        //     text
        // })
        const result = await todoModel.create({ title, text })
        if (!result) {
            return res.status(500).send({ messasge: "error saving to database", status: false })
        }
        console.log(result)
        res.redirect("/todo/viewtodo")
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", status: false })
    }
    // todoarray.push(req.body)
    // res.render("index", { todoarray: todoarray })
}
const deleteTodo = async (req, res) => {
    let index = req.body.index
    console.log(index);
    const deleteitem = await todoModel.findByIdAndDelete({ _id: index });
    console.log(deleteitem);
    // todoarray.splice(index, 1)
    res.redirect("/todo/viewtodo")
}

const viewEditTodo =  async (req, res) => {
    console.log(req.params.id);
    id = req.params.id
    // let title
    // let text
    // for (let i = 0; i < todoarray.length; i++) {
    //     const element = todoarray[i];
    //     title = todoarray[id].title;
    //     text = todoarray[id].text
    // }
    const todo = await todoModel.findOne({ _id:id })
    console.log(todo);
    const { title, text, _id } = todo
    res.render("edit", { title, text, _id });
}

const editTodo =  async (req, res) => {
    try {
        let _id = req.body._id
        let newtitle = req.body.title
        let newtext = req.body.text
        console.log(_id, newtitle, newtext)
        const updatetodo = await todoModel.findByIdAndUpdate(
            { _id:_id }, { $set: { title: newtitle, text: newtext } }
        )
        console.log(updatetodo);
        res.redirect("/todo/viewtodo")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {viewTodo, createTodo, deleteTodo, viewEditTodo, editTodo}