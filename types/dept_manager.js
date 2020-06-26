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

const Employee = require('../models/employee').Employee;
const Department = require('../models/departments').Department;
const DeptManager = require('../models/dept_manager').DeptManager;

// 6 - Dept_manager must have empId, deptId, from_date, to_date

const DeptManagerType = new GraphQLObjectType({
    name: 'DeptManagerType',
    description: 'Represent deptManager assigned to a employee and department',
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
                    embedded: false // IdInputType
                },
            },
            resolve(parent,args){
                console.log(parent.empId);
                return Employee.findById(parent.empId)
            } 
        },
        department: {
            type: DepartmentType,
            extensions: {
                relation: {
                    connectionField: 'deptId',
                    embedded: false // IdInputType
                },
            },
            resolve(parent,args){
                console.log(parent.deptId);
                return Department.findById(parent.deptId)
            } 
        }
    }) 
});

gnx.connect(DeptManager,DeptManagerType,'deptManager','deptManagers');
module.exports = DeptManagerType;

const EmployeeType = require('./employee.type'); 
const DepartmentType = require('./department'); 
