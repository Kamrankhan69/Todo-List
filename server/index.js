const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const { text } = require('stream/consumers');

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const{id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body; 
    
    TodoModel.findByIdAndUpdate(id, { task }, { new: true })
      .then(updatedTodo => {
        if (!updatedTodo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error updating todo', error: err.message });
      });
  });
  


    

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log('Server running on port 3001')
})