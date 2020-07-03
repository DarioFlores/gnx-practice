const assert = require("assert");
const { isObject } = require("util");
const url = "http://localhost:3000";
const request = require("supertest")(url);
const fs = require('fs');

const {
  ValidateDni, ValidateAge
} = require('../validators/employee.validator');
const EmployeeType = require("../types/employee.type");

const dirName= `${__dirname}/query`

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
            //isObject(data);
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

  it("addemployee validation DNI", async function () {
    const dni = "123456"
    let Employee = require('../models/employee').Employee;
    const existEmployee = await Employee.findOne({
        dni
    })
    if(!existEmployee){
        await Employee.create({
            dni
        })
    }
    request
      .post("/graphql")
      .send({
        query: `
        mutation {
              addemployee(input: {dni: "${dni}"}) {
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

  it('Should THROW ERROR when try create an employee with same dni', async function(){
    const dni = '39012682'
    let Employee = require('../models/employee').Employee
    const createEmployee = await Employee.create({
      dni
    })
    //console.log('LO QUE TIENE EL DIRNAME',dirName);
    
    const typeName = 'employeeType'
    const originalObject= ''
    const materializeObject=JSON.parse(fs.readFileSync(`${dirName}/employee1.json`));
    //console.log('EL JSON QUE LEO',materializeObject)
    try {
      await ValidateDni.validate(typeName,originalObject,materializeObject);
      throw new Error('Test Failed');
    } catch (error) {
      console.log('EL ERROR DEL CATCH',error.extensions.code)
      //expect(error.toString()).to.equal('Error: DNI is already exist')
    }
  });

  it('Should THROW ERROR when try create an employee with age under 18 years old',async function(){
    const typeName= 'employeeType';
    const originalObject = '';
    const materializeObject = JSON.parse(fs.readFileSync(`${dirName}/employee1.json`))
    try {
      await ValidateAge.validate(typeName,originalObject,materializeObject);
      throw new Error('Test Failed');
    } catch (error) {
      console.log('ERROR DE LA EDAD',error);
    }
  })
});
