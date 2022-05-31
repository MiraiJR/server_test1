const express = require('express')


const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const db = require('./config/db')
const route = require('./routes')

// kết nối database
db.connectDB()

const app = express()
const port = process.env.port || 3000

// cấu hình sử dụng file tinh
app.use('/comic', express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public'))) 

//middleware
app.use(express.urlencoded())
app.use(express.json())

// template engine cho website
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// định nghĩa route
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})