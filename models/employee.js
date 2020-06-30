const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeFields  = {
    dni: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    birth_date: Date,
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type:String,
        trim: true
    },
    gender: String,
    hire_date: Date,
};
//dni, birth_date, firsta_name, last_name, gender, hire_date
const employeeSchema = new Schema(employeeFields);
const Employee = mongoose.model("employee", employeeSchema);

module.exports = {Employee,employeeFields}  
