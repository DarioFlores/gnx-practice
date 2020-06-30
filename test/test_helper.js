const gnx = require("@simtlix/gnx");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const os = require("os");
const app = require('../app');

before((done) => {
    let ipName;
    if (os.type() === "Linux") {
        ipName = "localhost";
    } else {
        ipName = os.hostname();
    }
    let urlDB;
    let opDB;
    urlDB = `mongodb://${ipName}:27017,${ipName}:27018,${ipName}:27019/practice_test`;
    opDB = {
        replicaSet: "rs",
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    mongoose.connect(urlDB, { ...opDB, useCreateIndex: true });
    mongoose.connection.once("open", () => {
        console.log("connected to database test");
    });


    const types = require("../types");
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

    const port = process.env.NODE_PORT || 3000
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    done();
});
