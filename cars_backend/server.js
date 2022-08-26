const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Car = require('./models/car')


const app = express()

app.use(express.json())
app.use(cors())

app.post('/car', (req, res) => {
    Car.create(req.body, (err, createdCar) => {
        res.json(createdCar)
    })
})

app.get('/car', (req, res) => {
    Car.find({}, (err, foundCar) => {
        res.json(foundCar)

    })
})

app.delete('/car/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id, (err, deletedCar) => {
        res.json(deletedCar)
    })
})

app.put('/car/:id', (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body,
        {new:true},(err, updatedCar) => {
            res.json(updatedCar)
        })
})



mongoose.connect('mongodb://127.0.0.1:27017/dealer')
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
})
app.listen(3000, () => {
    console.log('listening...');
})