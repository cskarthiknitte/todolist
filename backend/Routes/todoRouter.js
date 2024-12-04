const express = require('express')
const { getAllToDo, createToDo, updateToDo, deleteToDo } = require('../Controllers/todoCntrl')
const Router = express.Router()


Router.get('/getall', getAllToDo)
Router.post('/', createToDo)
Router.put('/updateToDo/:id', updateToDo)
Router.delete('/deleteToDo/:id', deleteToDo)

module.exports = Router






