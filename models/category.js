const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryFields = {
    name: String
  };

const categorySchema = new Schema(categoryFields);
const Category = mongoose.model('Category', categorySchema, 'category');
Category.createCollection();
module.exports = {categoryFields, Category};
