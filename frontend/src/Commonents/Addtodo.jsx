import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Addtodo() {

    const [message, setMessage] = useState('');

    const createTodo = async () => {
        //validate message
        if (message === '') {
            toast.error('Cannont add an empty message');
            return;

        }
        if (message.length < 4 || message.length > 20) { 
            toast.error('message must be between 4 and 20 characters',);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/todolist/',{
                message:message,
            });
            if (response.data.success === 'created') {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            
        }
    };
    return (
        <div className='container'>
            {/* input  for message*/}
            <input  className='input'
            type="text" 
            placeholder='Add task here'
            onChange={(e) => setMessage(e.target.value)}
            />

            {/*add button*/}
            <button onClick={createTodo} className='btn'>ADD</button>

        </div>
    );
}
