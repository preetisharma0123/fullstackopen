require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('dist'))

app.use(cors())

app.use(express.json());

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  let countPerson = persons.length
  var timeInMss = new Date();
  response.send(`<p>Phonebook has info for ${countPerson} people</p>
  <p>${timeInMss}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

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
  }
  // else if(newName){
  //   response.status(409).json({ error: 'name must be unique' })
  // }else if (newNumber){
  //   response.status(409).json({ error: 'number must be unique' })
  // }else{
    const person = new Person({
    id: generateID(),
    name: body.name,
    number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
   
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})