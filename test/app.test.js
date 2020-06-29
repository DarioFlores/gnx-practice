const assert = require("assert");
const url = "http://localhost:3000";
const request = require("supertest")(url);
const app = require("../app");

describe("Test de ejemplo", () => {
    it("Retorna un array Query employess", (done) => {
        request
            .get("/graphql")
            .send({
                query: `{
            employess {
              id
              dni
            }
          }
          `,
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array with one user
                if (err) return done(err);
                assert.equal(Array.isArray(res.body.data.employess), true);
                done();
            });
    });

    it("Mutation departament", (done) => {
        const name = Math.random();
        request
            .post("/graphql")
            .send({ query: `mutation{
                adddepartment(input: {
                    dept_name:"${name}"
                }){
                    id
                    dept_name
                }
            }`})
            .expect(200)
            .end((err, res) => {
                // res will contain array with one user
                if (err) return done(err);
                const data = res.body.data.adddepartment;
                assert.equal(data.hasOwnProperty("id"), true);
                assert.equal(data.hasOwnProperty("dept_name"), true);
                done();
            });
    });
});
