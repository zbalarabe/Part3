const express = require('express')
var morgan = require('morgan')
morgan.token('content', function(req, res) {
    return JSON.stringify(req.body);
});
const cors = require('cors');

const app = express()

app.options('*', cors()) // include before other routes

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let count = persons.length
let date = new Date()

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phone book has info for ${count} people</p><p>${date}</>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const contact = persons.find(contact => contact.id === id)
    console.log(contact)
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(contact => contact.id !== id)
    
      response.status(204).end()
  })

const newId = () => {
    return Math.floor(Math.random() * 500)
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    const existingContact = persons.filter((exC) => exC.name === body.name)
    .map(exist => exist.name)
    
    console.log(body.name, existingContact)

    if (existingContact.includes(body.name) === false) {
        if (!body.name || !body.number) {
            return response.status(400).json({
                error: 'name or number missing'
              })
        }
      } else {
        return response.status(400).json({
            error: 'name must be unique'
        })
      }


    const contact = {
        id: newId(),
        name: body.name,
        number: body.number
      }

    persons = persons.concat(contact)

    response.json(contact)
  })


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
