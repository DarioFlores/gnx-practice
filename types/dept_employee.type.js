const gnx = require('@simtlix/gnx');
const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const Employee = require('../models/employee').Employee;
const Department = require('../models/departments').Department;
const DeptEmployee = require('../models/dept_employee').DeptEmployee;
const CantBeSameEmployeeWithTwoTitlesDeptEmployee = require('../validators/deptEmployee.validators').CantBeSameEmployeeWithTwoTitlesDeptEmployee; 
const {
    GraphQLDate
} = graphqlIsoDate

const {
    GraphQLID,
    GraphQLObjectType
} = graphql

const {
    ValidateDateinterval, validateDateIntervalEmployee
} = require('../validators/dateInterval.validator')

const DeptEmployeeType = new GraphQLObjectType({
    name:'DeptEmployee',
    description: 'Represent deptEmployee assigned to a employee and department',
    extensions: {
        validations: {
            CREATE: [ValidateDateinterval,CantBeSameEmployeeWithTwoTitlesDeptEmployee],
            UPDATE: [ValidateDateinterval,CantBeSameEmployeeWithTwoTitlesDeptEmployee]
        }
    },
    fields: () => ({
        id: {
            type: GraphQLID
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
                    connectionField: 'empId',
                    embedded: false
                },
            },
            resolve(parent,args){
                return Employee.findById(parent.empId)
            }
        }, 
        department:{
            type: DepartmentType,
            extensions: {
                relation: {
                    connectionField: 'deptId',
                    embedded: false
                },
            },
            resolve(parent,args){
                return Department.findById(parent.deptId)
            }
        }
    })
})

gnx.connect(DeptEmployee,DeptEmployeeType,'deptEmployee','deptEmployess');
module.exports = DeptEmployeeType;

const EmployeeType = require('./employee.type');
const DepartmentType = require('./department');
