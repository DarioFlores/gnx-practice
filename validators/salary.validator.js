const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const Salary = require('../models/salary');

const CantDeleteEmployeeWithSalary = {
    validate: async function(typeName, originalObject, materializeObject){
        const salary = await Salary.findOne({
            'empId' : originalObject.empId
        })

        if(salary){
            throw new CantDeleteEmployeeWithSalaryError(typeName)
        }
    }
}

class CantDeleteEmployeeWithSalaryError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'This employee has a related salary'
        )
    }
}

module.exports = {
    CantDeleteEmployeeWithSalary
}