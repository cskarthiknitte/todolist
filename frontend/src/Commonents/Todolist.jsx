import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' });

    const getAllTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todolist/getall');
            setTodos(response.data.data);
        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);


    //the useeffect hook is an essentical part of this react component . it is  used to performs side  effect in functional components,such as fetching data, subscribing on evenets ,or manually updating the DOM.

    //In this component,the useEffect is used to fetch the initial list of to-dos from the backend when the component is first renderd.

    //In this case, getAllTodods() is called inside the function to fetch the list of todos

    //the empty array ([]) is the dependency array.
    //It  specifies when the effect should re-run:
    //An empty array means the effect will run only once after the initial render of the components.
    //If dependencies  are added (e.g., [todos]), the effect will run every times those dependencies change.

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/todolist/deleteTodo/${id}`);
            if (result.data.success === 'deleted') {
                toast.success('Todo deleted successfully');
                getAllTodos();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete todo.');

        }
    };

    const handleEditInputChange = (e) => {
        setCurrentTodo({ ...currentTodo, message: e.target.value });
    };

    // {...currentTodo} means "create a new object and copy all properties of current todo into it"

    // Example workflow
    //Initial State:

    //


    //user clicks the edit Button for a To-Do:  Let,s say the user clicks the edit button for the To-Do:

    //{_id: '123', message: 'Buy groceries'}
    //handleEdit is called:

    //

    // { _id: "123", message: 'buy groceries'}
    //UI Updates:

    //The components detects isEditing = true and switches to the edit view.

    //the input field is pre-filled with the text  "Buy groceries" from currentTodo.message.

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ _id: todo._id, message: todo.message });
    };

    const handleUpdate = async () => {
        // Validate the message before updating
        if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
            toast.error("Message must be between 4 to 20 characters.");
            return; // Block the update if validation fails
        }

        try {
            const result = await axios.put(`http://localhost:5000/todolist/updateTodo/${currentTodo._id}`, {
                message: currentTodo.message
            });
            if (result.data.success === 'updated') {
                toast.success('Todo updated successfully!');
                getAllTodos(); // Refresh the todos list


                setIsEditing(false);
                setCurrentTodo({ _id: null, message: '' });
            }
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update todo.');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: '' });
    };


    return (
        <div>
            {isEditing ? (
                <div> className="div"
                    <input className="output"
                        type="text"
                        value={currentTodo.message}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            {todo.message}
                            <AiFillEdit className="icon" onClick={() => handleEdit(todo)} />
                            <AiFillDelete className="icons" onClick={() => handleDelete(todo._id)} />
                        </li>
                    ))}



                </ul>
            )}

        </div>
    )
}

export default Todolist
