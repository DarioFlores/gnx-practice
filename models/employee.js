const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeFields = {
    dni: String,
    birth_date: Date,
    firsta_name: String,
    last_name: String,
    gender: String,
    hire_date: Date,
};
//dni, birth_date, firsta_name, last_name, gender, hire_date
const employeeSchema = new Schema(employeeFields);
const Employee = mongoose.model(employeeSchema, "employee");

if(!Employee.collection.collection){
    Employee.createCollection();
}

module.exports = { employeeFields, Employee };
