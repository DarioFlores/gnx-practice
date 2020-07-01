const assert = require("assert");
const url = "http://localhost:3000";
const request = require("supertest")(url);


describe("================ Test de ejemplo ================", function (){
    
    it("Retorna un array Query employess", function (done) {
        request
        .get("/graphql")
        .send({query: `{
            employess {
                id
                dni
            }
        }`,})
        .expect(200)
        .end((err, res) => {
            // res will contain array with one user
            if (err) return done(err);
            assert.equal(Array.isArray(res.body.data.employess), true);
            done();
        });
    });
});
