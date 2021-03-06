const gnx = require('@simtlix/gnx');
const graphql = require('graphql');
const {AuditableObjectFields} = require('./extended/auditableGraphQLObjectType');
const graphqlIsoDate = require('graphql-iso-date');

const {
 GraphQLID,
 GraphQLFloat,
 GraphQLObjectType
} = graphql

const {
    GraphQLDate
} = graphqlIsoDate;

const { 
    ValidateDateinterval
} = require('../validators/dateInterval.validator');

const Employee = require('../models/employee').Employee;
const Salary = require('../models/salary').Salary;


const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent salary assigned to a employee',
    extensions: {
        validations: {
            CREATE: [ValidateDateinterval],
            UPDATE: [ValidateDateinterval]
        }
    },
    fields: () => ({
        id: {
            type: GraphQLID
        }, 
        salary: {
            type: GraphQLFloat
        },
        from_date: {
            type: GraphQLDate
        },
        to_date: {
            type: GraphQLDate
        },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    connectionField: 'empId' 
                },
            },
            resolve(parent,args){
                console.log(parent.empId);
                return Employee.findById(parent.empId)
            } 
        }
    }) 
});

gnx.connect(Salary,SalaryType,'salary','salaries');
module.exports = SalaryType;

const EmployeeType = require('./employee.type'); 