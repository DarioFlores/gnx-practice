const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Title} = require('../models/title');

const CantDeleteEmployeeWithTitle = {
    validate: async function(typeName, originalObject, materializeObject){
        const title = await Title.findOne({
            'empId' : originalObject
        })
        if(title){
            throw new CantDeleteEmployeeWithTitleError(typeName)
        }
    }
}

class CantDeleteEmployeeWithTitleError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'This Employee has a related title'
        )
    }
}

module.exports = {
    CantDeleteEmployeeWithTitle
}
