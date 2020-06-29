const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {DeptEmployee} = require('../models/dept_employee');
const {DeptManager} = require('../models/dept_manager');

const CantDeleteEmployeeWithDepartment_employee = {
    validate: async function(typeName, originalObject, materializeObject){
        const dept_employee = await DeptEmployee.findOne({
            'empId' : originalObject
        })
        if(dept_employee){
            throw new CantDeleteEmployeeWithDepartment_employeeError(typeName)
        }
    }
}

class CantDeleteEmployeeWithDepartment_employeeError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'This Employee has a related a department'
        )
    }
}

const CantDeleteEmployeeWithDepartment_manager = {
    validate: async function(typeName, originalObject, materializeObject){
        const dept_manager = await DeptManager.findOne({
            'deptId' : originalObject
        })
        if(dept_manager){
            throw new CantDeleteEmployeeWithDepartment_managerError(typeName)
        }
    }
}

class CantDeleteEmployeeWithDepartment_managerError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'This employee has a related department as the manager'
        )
    }
}

module.exports = {
    CantDeleteEmployeeWithDepartment_employee,
    CantDeleteEmployeeWithDepartment_manager
}
