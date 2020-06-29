const app = require('./app.js');
const gnx = require("@simtlix/gnx");
const graphqlHTTP = require("express-graphql");


const port = process.env.NODE_PORT || 3000
const types = require("./types");
const includedTypes = Object.values(types);
// Crea automaticamente las       Querys     y   Mutations
const schema = gnx.createSchema(includedTypes, includedTypes);

app.use(
    "/graphql",
    graphqlHTTP({
        // Directing express-graphql to use this schema to map out the graph
        schema,
        /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    which provides an interface to make GraphQl queries */
        graphiql: true,
    })
);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
