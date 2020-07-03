const Salary = require('../models/salary').Salary
const fs = require('fs');
const { 
    ValidateDateinterval
} = require('../validators/dateInterval.validator');
const dirName = `${__dirname}/query`

describe("#################TEST DE SALARY########",function (){
    it('Should THROW ERROR when try create an salary with from_date greater than to_date',async function(){
        const typeName = 'salaryType';
        const originalObject = '';
        const materializeObject = JSON.parse(fs.readFileSync(`${dirName}/salary1.json`));
        try {
            await ValidateDateinterval.validate(typeName,originalObject,materializeObject);
            throw new Error('Test Failed');
        } catch (error) {
            console.log('ERROR INTERVALO DE FECHA EN SALARY',error.extensions.code);
        }
    })
})