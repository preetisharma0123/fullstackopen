const mongoose = require('mongoose')

const url = process.env.MONGODB_URL;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phonenumber: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length>2) {
  const person = new Person({
    name: process.argv[2],
    phonenumber: process.argv[3],
  })

  person.save().then(result => {
    console.log(`Added ${result.name}, number: ${result.phonenumber} to phonebook!`)
    mongoose.connection.close()
  })
}

if (process.argv.length==2) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
    console.log(`${person.name} ${person.phonenumber}`)
  })
  mongoose.connection.close()
})
}

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



