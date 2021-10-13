const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRouters = require('./routes/blogRoutes')


//connection to the MongoDB
mongoose.connect('mongodb://localhost/MyBlog', {useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{
    
    app.listen(8000)

})
.catch((err)=>{
    console.log('Ulanishda xatolik!',err)
})


//register view engine

app.set('view engine', 'ejs')
app.set('views', 'view')

//midelleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.get('/', (req, res)=>{
  res.redirect('/blogs')
})


app.get('/about', (req, res)=>{
    res.render('about', {title:"About"})
  })

  //blog routes
  app.use('/blogs', blogRouters)

//redirect form
app.get('/about-me', (req, res)=>{
      res.redirect('/about')
  })
  
 //404 page

  app.use((req, res)=>{
     res.status(404).render('404', {title:'Not Found'}) 
  })
