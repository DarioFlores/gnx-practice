const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Category = require('../models/category').Category;

const {
  GraphQLObjectType, GraphQLString, GraphQLID
} = graphql;

// TODO ESTO ES IGUAL A LO QUE VENIAMOS HACIENDO
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

// AQUI RELACIONA EL TIPO CON EL MODELO DE LA BASE DE DATOS
//gnx.connect - model: any, gqltype: any, simpleEntityEndpointName: any, listEntitiesEndpointName: any
gnx.connect(Category, CategoryType, 'category', 'categories');

module.exports = CategoryType;