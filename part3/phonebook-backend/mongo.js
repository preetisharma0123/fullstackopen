const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://preetisharma0123:${password}@cluster0.f5kvtrb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
  

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phonenumber: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length>3) {
  const person = new Person({
    name: process.argv[3],
    phonenumber: process.argv[4],
  })

  person.save().then(result => {
    console.log(`Added ${result.name}, number: ${result.phonenumber} to phonebook!`)
    mongoose.connection.close()
  })
}

if (process.argv.length==3) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
    console.log(`${person.name} ${person.phonenumber}`)
  })
  mongoose.connection.close()
})
}

// const person4 = new Person({
//   name: 'Ada Lovelace',
//   phonenumber: '39-44-5323523',
// })


