const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryFields = {
    empId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    salary: Number,
    from_date: Date,
    to_date: Date,
};
// 3 - Salaries must have empId, salary, from_date, to_date
const salarySchema = new Schema(salaryFields);
const Salary = mongoose.model("Salary", salarySchema, "salary");
Salary.createCollection();
module.exports = { salaryFields, Salary };
