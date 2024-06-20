const express = require('express')
const app = express()
app.use(express.json())

let persons =[
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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  let countPerson = persons.length
  var timeInMss = new Date();
  response.send(`<p>Phonebook has info for ${countPerson} people</p>
  <p>${timeInMss}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person){
    response.json(person)
  } else{
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateID = () => {
  const maxID = persons.length >0
    ? Math.max(...persons.map(person => person.id))
    : 0
    return maxID + 1
}
app.post('/api/persons', (request,response) => {
  const body = request.body

  const newName = persons.find(person => person.name === body.name)
  const newNumber = persons.find(person => person.number === body.number)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }else if(newName){
    response.status(409).json({ error: 'name must be unique' })
  }else if (newNumber){
    response.status(409).json({ error: 'number must be unique' })
  }else{
      const newPerson = {
      id: generateID(),
      name: body.name,
      number: body.number,
  }
    persons = persons.concat(newPerson)
    response.json(newPerson)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})