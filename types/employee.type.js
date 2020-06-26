const gnx = require('@simtlix/gnx');
const graphql = require('graphql');
const Employee = require('../models/employee').Employee;
const Salary = require('../models/salary').Salary;
const Title = require('../models/title').Title;
const {AuditableObjectFields} = require('./extended/auditableGraphQLObjectType');
const graphqlIsoDate = require('graphql-iso-date');
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql;
 
const GenderEnumType = require('./enum/gender.enum');

const {
    GraphQLDate
} = graphqlIsoDate

const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent Employee',
    fields: () => Object.assign(AuditableObjectFields,{
        id: {
            type: GraphQLID
        },
        dni: {
            type: GraphQLNonNull(GraphQLString)
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        gender: {
            type: GenderEnumType
        },
        birth_date: {
            type: GraphQLDate
        },
        hire_date: {
            type: GraphQLDate
        },
        salary: {
            type: SalaryType,
            extensions: {
                relation: {
                    connectionField: 'empId',
                    embedded: false
                }
            },
            resolve(parent,args){
                return Salary.find({
                    'empId': parent.id
                })
            }
        },
        title: {
            type: TitleType,
            extensions: {
                relation: {
                    connectionField: 'empId',
                    embedded: false
                }
            },
            resolve(parent,args){
                return Title.find({
                    'empId': parent.id
                })
            }
        }
    })
})

gnx.connect(Employee,EmployeeType,'employee','employess');
module.exports = EmployeeType 

const SalaryType = require('./salary.type');
const TitleType = require('./title');

