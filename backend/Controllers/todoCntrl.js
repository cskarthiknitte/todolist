const Todo = require("../Model/todo");


const createToDo = async (req, res) => {
    const { message } = req.body;
    if (req.body.message === "") {
        return res.status(401).json({ errorMessage: "Message cannot be empty" });
    }
    //validation:check if message is empty or does not meet the length requirements
    if (!message || message.length < 4 || message.length > 20) {
        return res
            .status(400)
            .json({ errorMessage: "message must be between 4 and 20 characters." });
    }
    try {
        const addToDO = await Todo.create({ message });
        res.status(200).json({ success: "created", data: addToDO });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });

    }
};

//get
const getAllToDo = async (req, res) => {
    try {
        const getToDo = await Todo.find({});
        res.status(200).json({ data: getToDo });
    } catch (error) {
        console.log(error);

    }
};
//when you see an empty {} object passed to the .find()method,it means that the function is requesting all the documents from the collection
const deleteToDo = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "deleted" });
    } catch (error) {
        console.log(error)
    }
};
//findbyidandDelete():this is a mongoose method that performs two actions in one step:
//find a document by its_id field.
//Delete that document from the collection.
//req.params.id refers to the ID of the ToDo item that you want to delete,which is passed in the URL for example,if the route is/delete/:id,req.params.id will contain the value of that id.

//A client makes a request to an endpoint like:
//Delete /todo/123456abcd
//where 1243546dgfg  is the ID of the ToDo item to be deleted
//Route Handler:
//The ID (25452466nbjgu)gets assigned to req.params.id.
//Mongoose operation
//findbyidanddelete(req,params.id)runs and looks for the document wiuth_id:245466hj in the Mongodb Collection.
//Deletion outcomes:
//if found, the 

const updateToDo = async (req, res) => {
    try {
        const updatedToDo = await Todo.findByIdAndUpdate(
            req.params.id,

            {
                message: req.body.message,
            },
            { new: true }

        );
        if (updatedToDo) {
            res.json({ success: "updated", data: updatedToDo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//{new:true}:this option tells mongoose to return the updated document instead of the old one. without{new:true},mongoose would return the document as it was before the update
module.exports = {
    createToDo,
    getAllToDo,
    updateToDo,
    deleteToDo
};