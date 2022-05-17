const moongose = require('mongoose');


const goalSchema = moongose.Schema({
text: {
    type: String,
    required: [true, 'Please add a goal'],
}

},{
    timestamps: true // this will automatically add createdAt and updatedAt fields
});


module.exports = moongose.model('Goal', goalSchema);