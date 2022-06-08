const express = require('express')


const morgan = require('morgan')
var methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const path = require('path')
const db = require('./config/db')
const route = require('./routes')

// kết nối database
db.connectDB()

const app = express()

// cấu hình sử dụng file tinh
app.use('/secure/login' ,express.static(__dirname + '/public'))
app.use('/secure' ,express.static(__dirname + '/public'))
app.use('/admin/:_id', express.static(__dirname + '/public'))
app.use('/admin', express.static(__dirname + '/public'))
app.use('/comic/:slug/:number', express.static(__dirname + '/public'))
app.use('/comic/:slug', express.static(__dirname + '/public'))
app.use('/comic', express.static(__dirname + '/public'))
app.use('/genre', express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public'))) 

//middleware
app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))

// template engine cho website
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            limit: (arr, limit) => {
                if (!Array.isArray(arr)) { return []; }
                return arr.slice(0, limit);
            },
            firstChapter: (array) => {
                return array[array.length-1].slugChapter
            }, 
            ifEquals: (arg1, arg2, options) => {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
            },
            compareInt: (array, number) => {
                return (array.length > number) ? true : false
            },
            returnArrayFromIndexXtoY: (array, indexX, indexY) => {
                return array.slice(indexX, indexY)
            },
            listNumerForPagination: (lengthList) => {
                let maxNumber
                if(lengthList % 16 == 0) {
                    maxNumber = lengthList/16
                }else {
                    maxNumber = lengthList/16 + 1
                }
                const result = []
                for(let i = 1; i <= maxNumber; i++)
                {
                    result.push(i)
                }
                return result;
            }, 
            reverseArray: (array) => {
                return array.reverse()
            },
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// định nghĩa route
route(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});