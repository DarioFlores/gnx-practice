const assert = require("assert");
const url = "http://localhost:3000";
const request = require("supertest")(url);

describe("Test de ejemplo", function () {
  it("Retorna un array Query employess", function (done) {
    request
      .get("/graphql")
      .send({
        query: `{
            employess {
                id
                dni
            }
        }`,
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);
        assert.equal(Array.isArray(res.body.data.employess), true);
        done();
      });
  });

  it("Mutation departament", function (done) {
    const name = Math.random();
    request
      .post("/graphql")
      .send({
        query: `mutation{
            adddepartment(input: {
                dept_name:"${name}"
            }){
                id
                dept_name
            }
        }`,
      })
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

  it("Mutation departament validate name", async function () {
    const name = "Dario";
    let Departament = require("../models/departments").Department;
    const existDepartament = await Departament.findOne({
      dept_name: name,
    });
    console.log("Entra", existDepartament);
    if (existDepartament == null) {
      await Departament.create({
        dept_name: name,
      });
    }
    request
      .post("/graphql")
      .send({
        query: `mutation{
                adddepartment(input: {
                    dept_name:"${name}"
                }){
                    id
                    dept_name
                }
            }`,
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);
        const data = res.body.errors[0];
        assert.equal(data.message, "DepartmentType");
        assert.equal(data.extensions.code, "dept_name is already exist");
        assert.equal(
          data.extensions.status,
          "Can not create a department with same name"
        );
      });
  });

  it("addemployee validation DNI", async function () {
    const name = "Matias2";
    const dni = "343243282222363"
    request
      .post("/graphql")
      .send({
        query: `
        mutation {
              addemployee(input: {dni: "${dni}", first_name: "${name}"}) {
              id
            }
          }
        `,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const data = res.body.errors[0];
        // console.log(res.body.data.addemployee.id);
        
        if (data)
        {
            assert.equal(data.message, "EmployeeType");
            assert.equal(data.extensions.code, "DNI is already exist");
            assert.equal(data.extensions.status,"Can not create a employee with the same dni");
        }
      });
  });
});
