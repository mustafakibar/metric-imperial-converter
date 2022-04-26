const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { suite } = require('mocha');
const {
  ERROR_INVALID_NUMBER,
  ERROR_INVALID_UNIT,
} = require('../controllers/convertHandler');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('GET /api/convert', function () {
    const validInput = '5.3kg';
    test(`Convert valid input: ${validInput}`, (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: validInput })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 5.3);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 11.68451, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });

    const invalidInput = '34.13xlbs';
    test(`Convert invalid input: ${invalidInput}`, function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: invalidInput })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, ERROR_INVALID_UNIT);
          done();
        });
    });

    const invalidNumber = '34/1/3lbs';
    test(`Convert invalid number: ${invalidNumber}`, (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: invalidNumber })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, ERROR_INVALID_NUMBER);
          done();
        });
    });

    const invalidNumberAndUnit = '34/1/3xlbs';
    test(`Convert invalid number and unit: ${invalidNumberAndUnit}`, (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: invalidNumberAndUnit })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, ERROR_INVALID_NUMBER + ' and unit');
          done();
        });
    });

    const inputWithoutNumber = 'lbs';
    test(`Convert with no number: ${inputWithoutNumber}`, (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: inputWithoutNumber })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.string,
            '1 pounds converts to 0.45359 kilograms'
          );
          done();
        });
    });
  });
});
