const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        minLength: [3, 'Must be at least 3 characters long, {VALUE} is not long enough'],
        maxLength: [20, 'Must be at most 20 characters long, {VALUE} is not supported']
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    image:{
        type: String,
        require: true,
    },
    newsletter:{
        type: String,
        defaultValue: "false",
      },
    isAdmin:{
        type: String,
        default: "false"
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned', 'deleted' ],
        default: 'active'
    }
},
  {
    timestamps: true,
  })

module.exports =  model('User', UserSchema)