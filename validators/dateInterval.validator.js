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
        const fromDate_1 = materializeObject.from_date;
        const toDate_1 = materializeObject.to_date;
        const EmployeeFound = await DeptEmployee.findOne({
        deptId: materializeObject.deptId,
        });
        console.log(EmployeeFound)
        const fromDate_2 = EmployeeFound.from_date;
        const toDate_2 = EmployeeFound.to_date;
        console.log("Desde (tratando de guarada)"+fromDate_1)
        console.log("hasta (tratando de guardar)"+toDate_1)
        console.log("Desde (del departamento encontrado)"+fromDate_2)
        console.log("hasta (del departamento encontrado)"+toDate_2)
        if(EmployeeFound){
            //cuando las fechas desde y hasta esta a dentro de la que ya existe o e sigual
            if(fromDate_1 >= fromDate_2 && toDate_1 <= toDate_2) {
                console.log("entro primer")
                throw new DateIntervalEmployeError(typeName);
            }
            //cuando la fecha desde esta adentro del periodo ya exitente y la fecha hasta esta afuera
            if(fromDate_1 > fromDate_2 && toDate_1 > toDate_2){
                console.log("entro segundo")
                throw new DateIntervalEmployeError(typeName);
            }
            //cuando la fecha desde esta afuera del periodo ya existente y la fecha hasta esta adentro 
            if(fromDate_1 < fromDate_2 && toDate_1 < toDate_2){
                console.log("entro tercer")
                throw new DateIntervalEmployeError(typeName);
            }
            //cuando la fechas entrante esta ensima de la periodo ya existente
            if(fromDate_1 < fromDate_2 && toDate_1 > toDate_2){
                console.log("entro cuarto")
                throw new DateIntervalEmployeError(typeName);
            }
        }
      
        // const Objectfoundfrom_date = await DeptEmployee.find({"from_date" : {"$gte" : materializeObject.from_date, "$lte" : materializeObject.to_date}})
        // const Objectfoundto_date = await DeptEmployee.find({"to_date" : {"$gte" : materializeObject.from_date, "$lte" : materializeObject.to_date}})
        // if(Objectfoundfrom_date || Objectfoundto_date ){
        //     throw new DateIntervalEmployeError(typeName);
        // }
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