const assert = require('assert');
const request = require('supertest');
const app = require('../app');


describe('Test de ejemplo', () => {
    
    it("Ejemplo Get", done => {
        assert.equal([1, 2, 3].indexOf(4), -1);
        done();
    })

})

