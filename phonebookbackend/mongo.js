const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://aliu27568:${password}@phonebook.jrxyvw5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(name && number){
    const person = new Person({
        name: name,
        number: number,
      })
    person.save().then(result => {
        console.log(`added ${name} ${number} to the phonebook`)
        mongoose.connection.close()
    })
}

if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
    })
}