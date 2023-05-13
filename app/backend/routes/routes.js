const express = require('express')
const app = express.Router()
const flights_data = require('../database/FlightsData.json')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/:id', (req, res) => {
    const id = req.params.id
    const flight = flights_data.flights.find(f => f.id == id)
    res.send(flight)
})


app.get('/', (req, res) => {
    res.send(flights_data.flights)
})

app.post('/add', (req, res) => {
    const flight = req.body
    flights_data.flights.push(flight)
    res.send(flight)
})

app.post('/search', (req, res) => {
    const flight = req.body
    start = flight.from
    end = flight.to
    const flights = flights_data.flights.filter(f => f.from == start && f.to == end)
    res.send(flights)
})


module.exports = app;