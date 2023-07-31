const {Schema, model} = require('mongoose');

const DonationsSchema = new Schema({
    donor: {
        type: Schema.Types.String,
        ref: 'Users',
        default: "fundacionFedeh@gmail.com"
    },
    amount: {
        type: Number,
        require: true
    },
    completed: {
        type: String,
        enum: ['completed', 'rejected', 'pending'],
        default: 'pending'

    }
},
{
  timestamps: true,
})

module.exports =  model('Donations', DonationsSchema)