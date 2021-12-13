const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
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
// customquery helper
userSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add plugin
// mongoose.plugin(slug);

// Course.plugin(AutoIncrement);
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', userSchema);
