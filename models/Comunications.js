const {Schema, model} = require('mongoose');

const ComunicationsSchema = new Schema ({ 
        title:{
            type: String,
            require: true,
        },
        subtitle:{
            type: String,
            require: true,
        },
        img:{
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
            type: Date
        },
        status: {
            type: String,
            enum: ['active', 'paused', 'finished', 'deleted' ],
            default: 'active'
        },
        
    
})
module.exports =  model('Comunication', ComunicationsSchema)