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
    {
      const input = '5.3kg';
      test(`Convert valid input: ${input}`, (done) => {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 5.3);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 11.68451, 0.1);
            assert.equal(res.body.returnUnit, 'lbs');
            done();
          });
      });
    }

    {
      const input = '34.13xlbs';
      test(`Convert invalid input: ${input}`, function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, ERROR_INVALID_UNIT);
            done();
          });
      });
    }

    {
      const input = '34/1/3lbs';
      test(`Convert invalid number: ${input}`, (done) => {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, ERROR_INVALID_NUMBER);
            done();
          });
      });
    }

    {
      const input = '34/1/3xlbs';
      test(`Convert invalid number and unit: ${input}`, (done) => {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, ERROR_INVALID_NUMBER + ' and unit');
            done();
          });
      });
    }

    {
      const input = 'lbs';
      test(`Convert with no number: ${input}`, (done) => {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((_err, res) => {
            assert.equal(res.status, 200);
            assert.equal(
              res.body.string,
              '1 pounds converts to 0.45359 kilograms'
            );
            done();
          });
      });
    }
  });
});
