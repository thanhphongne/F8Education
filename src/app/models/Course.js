const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        // _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        level: { type: String },
        videoid: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        // _id: false,
        timestamps: true,
    },
);
// customquery helper
courseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add plugin
mongoose.plugin(slug);

// Course.plugin(AutoIncrement);
courseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', courseSchema);
