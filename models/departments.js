const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentFields = {
    dept_name: String
};
// 3 - Salaries must have empId, department, from_date, to_date
const departmentSchema = new Schema(departmentFields);
const Department = mongoose.model("Department", departmentSchema, "department");
Department.createCollection();
module.exports = { departmentFields, Department };
