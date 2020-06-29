const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const Employee = require('../models/employee');


const ValidateDni = {
    validate: async function(typename, originalObject, materializeObject){
        const employee = await Employee.findOne({
            dni: materializeObject.dni
        });
        if(employee){
            throw new DuplicateDniError(typename);
        }
    }
}

class DuplicateDniError extends GNXError {
    constructor(typename){
        super(
            typename,
            'DNI is already exist',
            'Can not create a employee with the same dni'
        )
    }
}

const ValidateAge = {
    validate: async function(typename,originalObject,materializeObject){
        const employee = materializeObject;
        let today = new Date();
        let birth_date = new Date(employee.birth_date);
        let age = today.getFullYear() - birth_date.getFullYear();
        let month = today.getMonth() - birth_date.getMonth();

        if(month <0 || (month == 0 && today.getDate() < birth_date.getDate())){
            age --
        }
        
        if(age < 18) {
            throw new EmployeeAgeError(typename);
        }
    }
}

class EmployeeAgeError extends GNXError {
    constructor(typename){
        super(
            typename,
            'Invalid Age, must be higher than  18 years old',
            'Can not create a employee with age under 18 years old'
        )
    }
}

module.exports = {
    ValidateAge,
    ValidateDni
}