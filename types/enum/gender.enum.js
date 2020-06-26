const { GraphQLEnumType} = require('graphql');

const GenderTypeEnum = new GraphQLEnumType({
    name: 'GenderTypeEnum',
    values:{
        M: {value: 'Male'},
        F: {value: 'Female'}
    }
})

module.exports = GenderTypeEnum;