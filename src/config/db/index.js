const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://btphong:redstore@redstore.mqf9s.mongodb.net/F8Education?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Succesfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
