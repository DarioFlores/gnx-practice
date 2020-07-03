const assert = require("assert");
const url = "http://localhost:3000";
const request = require("supertest")(url);
let Departament = require("../models/departments").Department;
const fs = require('fs');
const dirName= `${__dirname}/query`
const {
    ValidateName
} = require('../validators/department.validator')

describe("================ Prueba de los departamentos ================", function () {

    it("Prueba si en la query departments trae una array de department", function (done) {
        request
            .get("/graphql")
            .send({
                query: `{
                    departments{
                        id
                        dept_name
                    }
                }`,
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array with one user
                if (err) return done(err);
                assert.equal(Array.isArray(res.body.data.departments), true);
                done();
            });
    });

    it("Prueba si en la query department trae un solo elemento", async function () {
        const name = Math.random();
        const department = await Departament.create({ dept_name: name });
        request
            .get("/graphql")
            .send({
                query: `{
                    department(id: "${department._id}"){
                        id
                        dept_name
                    }
                }`,
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array with one user
                if (err) return done(err);
                const data = res.body.data.department;
                assert.equal(data.hasOwnProperty("id"), true);
                assert.equal(data.hasOwnProperty("dept_name"), true);
            });
    });

    it("Prueba si Mutation departament funciona correctamente", function (done) {
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

    it("Prueba si en el Mutation departament valida si se repite el nombre", async function () {
        const name = "Dario";
        const existDepartament = await Departament.findOne({
            dept_name: name,
        });
        if (existDepartament == null) {
            console.log("Entra", existDepartament);
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
                assert.equal(
                    data.extensions.code,
                    "dept_name is already exist"
                );
                assert.equal(
                    data.extensions.status, "Can not create a department with same name"
                );
            });
    }); 

    it("Prueba si en la Mutation adddepartment si la propiedad dept_name puede aceptar numeros", function (done) {
        const numero = Math.random();
        request
            .get("/graphql")
            .send({
                query: `mutation{
                    adddepartment(input: {
                        dept_name:${numero}
                    }){
                        id
                        dept_name
                    }
                }`,
            })
            .expect(400)
            .end((err, res) => {
                // res will contain array with one user
                if (err) return done(err);
                const data = res.body.errors[0];
                assert.equal( data.message, `String cannot represent a non string value: ${numero}` );
                done();
            });
    });

    it("Should THROW ERROR when try create an department with same name",async function(){
        const dept_name='Informatica';
        Departament.create({
            dept_name
        });
        const typeName='departmentType';
        const originalObject= '';
        const materializeObject= JSON.parse(fs.readFileSync(`${dirName}/department1.json`));
        try {
            await ValidateName.validate(typeName,originalObject,materializeObject);
            throw new Error('Test Failed');
        } catch (error) {
            console.log('ERROR DEL MISMO NOMBRE DE DEPARTAMENTO',error.extensions.code);
        }
    })
});
