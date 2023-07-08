const {Schema, model} = require('mongoose');

const EventsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    detail: {
        type: [String],
        require: true
    },
    imgDetail: {
        type: [String],
        ref: 'Users',
        default: "fundacion Fedeh"
    },
    date:{
        type: String
    },
    amount: {
        type: Number,
        default: 0
    }
})

module.exports =  model('Events', EventsSchema)