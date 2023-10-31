const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: Schema.Types.String, minLength: 3, maxLength:33, required: true,},
    surname: {type: Schema.Types.String, minLength: 3, maxLength:33, required: true,},
    email:{type: Schema.Types.String, minLength: 6, required: true,},
    password:{type:Schema.Types.String, length:64, required: true,},
    is_member:{type:Schema.Types.Boolean, default: false, },
    is_admin:{type:Schema.Types.Boolean, default: false,},
})

userSchema.virtual('userName').get(function () {
    return `${this.name} ${this.email}`
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
