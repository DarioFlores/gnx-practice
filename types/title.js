const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Employee= require('../models/employee').Employee;
const Title= require('../models/title').Title;



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQL
} = graphql;

const titleType = new GraphQLObjectType({
    name:'StudentType',
    description:'Represent Title',
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        from_date:{type:GraphQLDate},
        to_date:{type:GraphQLDate},
        employee:{
            type:EmployeTipe,
            extensions:{
                relation:{
                    connectionField:'empId'
                }
            },
            resolve(parent,args){
                return Employee.findById(parent.empId)
            }
        }
    })
})
gnx.connect(Title,titleType,'title','titles');
module.exports=titleType;
const EmployeTipe = require('./employee');
const { GraphQLDate } = require("graphql-iso-date");
