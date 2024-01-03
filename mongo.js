const mongoose = require('mongoose')

// if (process.argv.length === 3) {
//     Contact.find({}).then(result => {
//         result.forEach(contact => {
//           console.log(contact)
//         })
//         mongoose.connection.close()
//       })    
// }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.aixikiu.mongodb.net/phonebokApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', phonebookSchema)

const contact = new Contact({
  name: `${name}`,
  number: `${number}`,
})

if (process.argv.length === 3) {
    Contact.find({}, 'name number').then(result => {
        result.forEach(contact => {
          console.log(contact)
        })
        mongoose.connection.close()
      })    
} else {
contact.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}


