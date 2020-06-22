const express = require('express');
const gnx = require('@simtlix/gnx');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/practice', { 
    replicaSet: 'rs',
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.once('open', () => {
  console.log('connected to database')
})


const types = require('./types');
const includedTypes = Object.values(types);
// Crea automaticamente las       Querys     y   Mutations
const schema = gnx.createSchema(includedTypes,includedTypes);


app.use('/graphql', graphqlHTTP({
    // Directing express-graphql to use this schema to map out the graph
    schema,
    /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    which provides an interface to make GraphQl queries */
    graphiql: true,
  }))

app.listen(3000, () => {
    console.log('Listening on port 3000')
})