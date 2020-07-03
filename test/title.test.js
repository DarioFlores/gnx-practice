const Title = require('../models/title').Title;
const fs = require('fs');
const {
    ValidateDateinterval
} = require('../validators/dateInterval.validator');
const dirName = `${__dirname}/query`;

describe('##############TEST DE TITLE################',function(){
    it('Should THROW ERROR when try create title with from_date greater than to_date',async function(){
        const typeName = 'titleType';
        const originalObject = '';
        const materializeObject = JSON.parse(fs.readFileSync(`${dirName}/title1.json`));
        try {
            await ValidateDateinterval.validate(typeName,originalObject,materializeObject);
            throw new Error('Test Failed');
        } catch (error) {
            console.log('ERROR INTERVALO DE FECHA DE TITLE',error.extensions.code);
        }
    })
})