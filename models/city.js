const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityFields = {
    name: String,
    population: Number
};
  
const citySchema = new Schema(cityFields);

const City = mongoose.model('City', citySchema, 'city');
City.createCollection();

module.exports = {cityFields, City};