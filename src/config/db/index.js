const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log('Connect to database successfully!')
            })
    } catch (error) {
        console.log('Fail to connect to database!')        
    }
}

module.exports = { connectDB }