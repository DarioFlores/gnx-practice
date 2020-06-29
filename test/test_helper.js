const mongoose = require('mongoose');
const os = require("os");

before( done => {
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

    mongoose.connect(urlDB, {...opDB, useCreateIndex: true});
    mongoose.connection.once("open", () => {
        // console.log("connected to database test");
    });
    done()
})



