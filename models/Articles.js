const {Schema, model} = require('mongoose');

const ArticlesSchema = new Schema({
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
   
},
//enum, 
{
  timestamps: true,
})

module.exports =  model('Articles', ArticlesSchema)