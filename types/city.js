const graphql = require('graphql');
const City = require('../models/city').City;
const gnx = require('@simtlix/gnx');

const {
  GraphQLObjectType, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList
} = graphql;

const CityType = new GraphQLObjectType({
  name: 'CityType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    population: { type: GraphQLInt }
  })
});

// AQUI RELACIONA EL TIPO CON EL MODELO DE LA BASE DE DATOS
//gnx.connect - model: any, gqltype: any, simpleEntityEndpointName: any, listEntitiesEndpointName: any
gnx.connect(City, CityType, 'city', 'cities');

module.exports = CityType;