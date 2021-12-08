const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, unique: true },
        email: { type: String, unique: true },
        phone: { type: String, unique: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        password: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
