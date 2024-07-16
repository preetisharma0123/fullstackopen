const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)


  const blog1 = new Blog({
    title: "Influencers Are Racing to Profit From the Trump Shooting",
    author: "Makena Kelly",
    url: "https://www.wired.com/story/trump-shooting-influencer-merchandise/",
    likes: 1000
  })

  const blog2 = new Blog({
    title: "The metaverse",
    author: "Amanda Hoover",
    url: "https://www.wired.com/story/metaverse-virtual-reality-office-work-slow-growth/",
    likes: 1000
  })

  blog1.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

  blog2.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
 
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})
