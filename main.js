const express = require('express');
const gnx = require('@simtlix/gnx');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
var os = require("os");

const app = express();
let ipName
if (os.type() === 'Linux') {
  ipName = 'localhost'
} else {
  ipName = os.hostname()
}
console.log(ipName);

mongoose.connect(`mongodb://${ipName}:27017,${ipName}:27018,${ipName}:27019/practice`, { 
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