const express = require('express')
const flights_data = require('./database/FlightsData.json')
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./routes/routes')

const app = express();
const port = 5000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/flights', route)

app.get('/cities', (req, res) => {
    const cities1 = flights_data.flights.map(f => f.from)
    const cities2 = flights_data.flights.map(f => f.to)
    const uniqueCities = [...cities1, ...cities2]
    const cities = [...new Set(uniqueCities)]
    res.send(cities)
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port} !`))