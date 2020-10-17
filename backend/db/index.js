const mongoose = require('mongoose')

mongoose
    .connect('mongodb://plantAdmin:vx7amcZpszG2dB3io4jYjczPsFey4Z@3.137.155.62', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db