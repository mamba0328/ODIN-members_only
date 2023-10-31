const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: {type: Schema.Types.String, minLength: 3, maxLength:100, required: true,},
    content: {type: Schema.Types.String, minLength: 1, maxLength:500, required: true,},
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true,},
    created_at: {type: Schema.Types.Date}
})

messageSchema.virtual('userName').get(function () {
    return `${this.name} ${this.email}`
})

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
