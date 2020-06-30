const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const DeptEmployee = require('../models/dept_employee').DeptEmployee;
const {Department} = require('../models/departments');

const ValidateDateinterval = {
    validate: async function (typeName, originalObject, materializeObject){
        if(materializeObject.from_date >= materializeObject.to_date){
            throw new DateIntervalError(typeName);
        }
    }
}

class DateIntervalError extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid Interval from_date must be smaller than to_date'
        )
    }
}

const validateDateIntervalEmployee = {
    validate: async function (typeName, originalObject, materializeObject){
        const Objectfoundfrom_date = await DeptEmployee.find({"from_date" : {"$gte" : materializeObject.from_date, "$lte" : materializeObject.to_date}})
        const Objectfoundto_date = await DeptEmployee.find({"to_date" : {"$gte" : materializeObject.from_date, "$lte" : materializeObject.to_date}})
        if(Objectfoundfrom_date || Objectfoundto_date ){
            throw new DateIntervalEmployeError(typeName);
        }
    }
}

class DateIntervalEmployeError extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid range from_date to_date contains an employee'
        )
    }
}
module.exports = {
    ValidateDateinterval,
    validateDateIntervalEmployee
}