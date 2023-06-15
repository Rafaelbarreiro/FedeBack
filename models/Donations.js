const {Schema, model} = require('mongoose');

const DonationsSchema = new Schema({
    donor: {
        type: Schema.Types.String,
        ref: 'Users',
        default: "fundacionFedeh@gmail.com"
    },
    cardId: {
        type: Schema.Types.String,
        ref: 'Donations'
    },
    amount: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: false,
        maxLength: [50, 'Must be at most 50 characters long, {VALUE} is too long']
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