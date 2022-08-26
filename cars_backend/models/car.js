const mongoose = require('mongoose')

const carSchema = new mongoose.Schema ({
    make: String,
    model: String,
    year: Number,
    color: String,
    image: String,
    sold: {type: Boolean, default: false}
},{timestamps: true}
)

const Car = mongoose.model('Car', carSchema)
module.exports = Car


