require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const Person = require('./models/person');
const config = require('./utils/config');
const logger = require('./utils/logger')

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

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => {
    if (persons){
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/api/info', (request, response,next) => {
  Person.find({})
  .then(persons => {
    let personCount = persons.length
    var timeInMss = new Date();

    if (personCount){
      response.send(`<p>Phonebook has info for ${personCount} people</p>
      <p>${timeInMss}</p>`)
    }else{
      response.status(400).end()
     } 
   })
   .catch((error) => next(error))
  })


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request,response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(200).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request,response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  Person.find({name: body.name})
    .then(result => {
      const person = {
        name: result.name,
        number: result.number,
        }
  
      Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error => next(error))
    })
  
  const newperson = new Person({
  name: body.name,
  number: body.number,
  })
  newperson.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch((error) => next(error))
})
  
app.put('/api/persons/:id', (request, response, next) => {
  const {name,number} = request.body

  Person.findByIdAndUpdate(request.params.id, 
    {name,number},
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})