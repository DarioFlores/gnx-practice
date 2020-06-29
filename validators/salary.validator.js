const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Salary} = require('../models/salary');

const CantDeleteEmployeeWithSalary = {
    validate: async function(typeName, originalObject, materializeObject){
        console.log('Mira esta linea',originalObject);
        
        const salary = await Salary.findOne({
            'empId' : originalObject
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