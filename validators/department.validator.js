const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Department} = require('../models/departments');

const ValidateName = {
    validate: async function(typeName, originalObject, materialiazeObject){
        //console.log('Linea que quiero',materialiazeObject);
        //console.log(typeName);
        //console.log(originalObject);
        
        const department = await Department.findOne({
            dept_name: materialiazeObject.dept_name
        })

        if(department){
            throw new DuplicateNameError(typeName)
        }
    }
}

class DuplicateNameError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'dept_name is already exist',
            'Can not create a department with same name'
        )
    }
}

module.exports = {
    ValidateName
}