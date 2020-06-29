const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

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

module.exports = {
    ValidateDateinterval
}