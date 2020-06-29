const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const DeptEmployee = require('../models/dept_employee').DeptEmployee;
const Title = require('../models/title').Title;

const CantBeSameEmployeeWithTwoTitlesDeptEmployee = {
    validate:async function(typeName,originalObject,materializedObject){
        const deptEmploye = await DeptEmployee.findOne({'empId':materializedObject.empId});
        const title = await Title.findOne({'empId':materializedObject.empId});
        let departmentFound = null;

        if (deptEmploye) 
        {
            departmentFound = await DeptEmployee.findOne({'deptId':deptEmploye.deptId})    
        }
        if (departmentFound&&title&&title._id !== materializedObject.id) {
            throw new CantBeSameEmployeeWithTwoTitlesDeptEmployeeError(typeName, 'The same employee can\'t have 2 titles with the same department');
        }
    }
}

class CantBeSameEmployeeWithTwoTitlesDeptEmployeeError extends GNXError {
    constructor(typeName, message) {
      super(typeName, message, 'CantBeSameEmployeeWithTwoTitlesDeptEmployeeError');
    }
  }
  
  module.exports = {
    CantBeSameEmployeeWithTwoTitlesDeptEmployee,
  };