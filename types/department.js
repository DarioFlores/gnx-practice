const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Department = require('../models/departments').Department;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const departmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent Department",
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLString },
  }),
});
gnx.connect(Department, departmentType, "department", "departments");

module.exports = departmentType;
