const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        // users: { type: String, required: true },
        courseSlug: {type: String, },
        name: {type: String, },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Cart', CartSchema);
