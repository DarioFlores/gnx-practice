const assert = require("assert");
const url = "http://localhost:3000";
const request = require("supertest")(url);
const app = require("../app");
const { isObject } = require("util");


describe("Test de ejemplo", function (){
    
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
    
    it("Mutation departament", function (done) {
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
    
    it("Mutation departament validate name", async function () {
        const name = 'Dario'
        let Departament = require('../models/departments').Department;
        const existDepartament = await Departament.findOne({
            dept_name: name
        })
        console.log('Entra',existDepartament)
        if (existDepartament == null) {
            await Departament.create({
                dept_name: name
            })
        }
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
                const data = res.body.errors[0];
                assert.equal(data.message, 'DepartmentType');
                assert.equal(data.extensions.code, 'dept_name is already exist');
                assert.equal(data.extensions.status, 'Can not create a department with same name');
            });
    });

    it("Probando Query department retorna un array",function(done){
        request 
        .get("/graphql")
        .send({query:`{
            departments{
                id
                dept_name
            }}
        `})
        .expect(200)
        .end((err,res)=> {
            if(err) return done(err);
            assert.equal(Array.isArray(res.body.data.departments),true);
            done();
        });
    });

    it("Probando Mutation employee", function(done){
        const dni = Math.random()
        request
        .post("/graphql")
        .send({query:`
            mutation{
                addemployee(input:{
                    dni:"${dni}"
                }){
                id
                dni
                first_name
                last_name
                gender
                birth_date
                hire_date
                }
            }
        `})
        .expect(200)
        .end((err,res)=> {
            if(err) return done(err);
            const data = res.body.data.addemployee
            console.log(data);
            assert.equal(data.hasOwnProperty("id"),true);
            assert.equal(data.hasOwnProperty("dni"),true);
            assert.equal(data.hasOwnProperty("first_name"),true);
            assert.equal(data.hasOwnProperty("last_name"),true);
            assert.equal(data.hasOwnProperty("gender"),true);
            assert.equal(data.hasOwnProperty("birth_date"),true);
            assert.equal(data.hasOwnProperty("hire_date"),true);
            done()
        });
    });

    it("Query que devuelve un solo empleado por medio de su id",async function(){
        let dni = Math.random();
        let Employee = require('../models/employee').Employee;
        const testEmployee = await Employee.create({dni});
        //console.log('MIRA ESTA LINEAAAAAAAAAAAAAA',testEmployee);
        request
        .get("/graphql")
        .send({query: `
            {
                employee(id:"${testEmployee._id}"){
                    id
                    dni
                    first_name
                    last_name
                    gender
                    birth_date
                    hire_date
                }
            }
        `})
        .expect(200)
        .end((err,res)=> {
            const data= res.body.data.employee
            //console.log('MIRA LA DATAAAAAAAAAAAAAAA',data);
            if(err) return done(err);
            assert.equal(isObject(res.body.data.employee),true);
            assert.equal(data.hasOwnProperty("id"),true);
            assert.equal(data.hasOwnProperty("dni"),true);
            assert.equal(data.hasOwnProperty("first_name"),true);
            assert.equal(data.hasOwnProperty("last_name"),true);
            assert.equal(data.hasOwnProperty("gender"),true);
            assert.equal(data.hasOwnProperty("birth_date"),true);
            assert.equal(data.hasOwnProperty("hire_date"),true);
        })
    });
});
