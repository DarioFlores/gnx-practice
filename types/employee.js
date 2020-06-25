const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
//salaries-titles-dept_manager-dept_employees
const Salarie = require('../models/salary').Salary/* */
// const Title = require('../models/title').Ditle/* */
// const Dept_manager = require('../models/dept_manager').Dept_manager/* */
// const Dept_employee = require('../models/dept_employee').Dept_employee/* */
const Employyee = require('../models/employee').Employee;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    Dre
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name:'EmployeeType',
    description:'Represent Employee',
    fields:()=>({
        id:{type:GraphQLID},
        dni:{type:GraphQLString},
        // birth_date:{type:GraphQLID}
        firsta_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        gender:{type:GraphQLString},
        // hire_date:{type:GraphQLID},
        // salarie:{
        //     type: SalarieType,/* */
        //     extensions:{
        //         relation:{
        //             connectionField:"empId"
        //         },
        //     },
        // },
        // resolve(parent, args) {
        //     return Salarie.findById(parent.SalarieID);
        //   },
        // title:{
        //     type: TitleType,/* */
        //     extensions:{
        //         relation:{
        //             connectionField:"empId"
        //         },
        //     },
        // },
        // resolve(parent, args) {
        //     return Title.find({empId:parent.id});
        //   },
        // dept_manager:{
        //     type: Dept_managerType,/* */
        //     extensions:{
        //         relation:{
        //             connectionField:"empId"
        //         },
        //     },
        // },
        // resolve(parent, args) {
        //     return Dept_manager.findById(parent.Dept_managerTypeID);
        //   },
        // dept_employee:{
        //     type: Dept_employeesType,/* */
        //     extensions:{
        //         relation:{
        //             connectionField:"empId"
        //         },
        //     },
        // },
        // resolve(parent, args) {
        //     return Dept_employee.findById(parent.Dept_employeesID);
        //   },


    })


})
 /* dni: String,
    birth_date: Date,
    firsta_name: String,
    last_name: String,
    gender: String,
    hire_date: Date,*/
gnx.connect(Employyee, EmployeeType , "employee", "employee");
module.exports = EmployeeType;

// const SalarieType = require("./SalarieType"); /* */
// const TitleType = require("./TitleType"); /* */
// const Dept_managerType = require("./Dept_managerType"); /* */
// const Dept_employeesType = require("./Dept_employeesType"); /* */