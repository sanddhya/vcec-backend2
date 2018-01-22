var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

//schema for categories
var productCategorySchema = new Schema({
    'category_name': {type: String, required: [true, "Category name is required."], unique: true},
    'img': {type: String, required: [true, 'Image is required.']},
    'coverImage': {type: String, required: [true, 'Image is required.']},
    'alternativeImage': {type: String, required: [true, 'Alternative Image is required.']},
    'desc': {type: String, required: [true, 'Description is required for category']},
    'addedBy': {type: String},
    created_at: Number,
    updated_at: Number
});

productCategorySchema.plugin(autoIncrement.plugin, {
    model: 'ProductCategory',
    field: 'categoryId',
    startAt: 1,
    incrementBy: 1
});

productCategorySchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date().getTime();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;
