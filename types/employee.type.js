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

const {
    ValidateAge,
    ValidateDni
} = require('../validators/employee.validator');

const {
    CantDeleteEmployeeWithSalary
} = require('../validators/salary.validator');

const {
    CantDeleteEmployeeWithTitle
} = require('../validators/title.validator');

const {
    CantDeleteEmployeeWithDepartment_employee,
    CantDeleteEmployeeWithDepartment_manager
} = require('../validators/dept_relation.validator');

const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent Employee',
    extensions: {
        validations: {
            CREATE: [ValidateDni,ValidateAge],
            UPDATE: [ValidateAge,ValidateDni],
            DELETE: [
                CantDeleteEmployeeWithSalary,
                CantDeleteEmployeeWithTitle,
                CantDeleteEmployeeWithDepartment_employee,
                CantDeleteEmployeeWithDepartment_manager
            ]
        }
    },
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
                    embedded: true // SalaryType
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
                    embedded: true // TitleType
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

