
import React from 'react';
import Header from './Commonents/Header';
import Addtodo from './Commonents/Addtodo';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todolist from './Commonents/Todolist';
import './App.css'


export default function App() {
    return (
        <>
    <Header />
     <Addtodo />
     <Todolist/>
     <ToastContainer />
    
     </>
    )
}
