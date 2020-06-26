const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryFields = {
    empId: Schema.Types.ObjectId ,
    salary: Number,
    from_date: Date,
    to_date: Date,
};
// 3 - Salaries must have empId, salary, from_date, to_date
const salarySchema = new Schema(salaryFields);
const Salary = mongoose.model('Salary',salarySchema);

if(!Salary.collection.collection){
    Salary.createCollection();
}
module.exports =  {Salary,salaryFields};
