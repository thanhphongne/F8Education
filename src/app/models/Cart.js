const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String },
        courseSlug: {type: String, },
        name: {type: String, },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Cart', CartSchema);
