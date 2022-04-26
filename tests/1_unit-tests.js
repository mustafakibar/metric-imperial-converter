const chai = require('chai');
chai.use(require('chai-string'));
const { suite } = require('mocha');
let assert = chai.assert;
const {
  ConvertHandler,
  ERROR_INVALID_NUMBER,
  ERROR_INVALID_UNIT,
} = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', (done) => {
  suite('Validate Input Number', () => {
    test('Should read the numbers in the input', (done) => {
      assert.equal(convertHandler.getNum('5kg'), 5);
      assert.equal(convertHandler.getNum('34lbs'), 34);
      done();
    });

    test('Should read the decimal numbers in the input', (done) => {
      assert.equal(convertHandler.getNum('5.3kg'), 5.3);
      assert.equal(convertHandler.getNum('34.13lbs'), 34.13);
      done();
    });

    test('Should read the fractial in the input', (done) => {
      assert.equal(convertHandler.getNum('3/5kg'), 0.6);
      assert.equal(convertHandler.getNum('13/34lbs'), 0.38235);
      done();
    });

    test('Should read the fractial with decimal in the input', (done) => {
      assert.equal(convertHandler.getNum('3.1/5kg'), 0.62);
      assert.equal(convertHandler.getNum('13.1/34lbs'), 0.38529);
      done();
    });

    test('Should correctly return an error due to double fraction', (done) => {
      assert.equal(convertHandler.getNum('3./1//5kg'), ERROR_INVALID_NUMBER);
      assert.equal(
        convertHandler.getNum('13.1/34/13.1lbs'),
        ERROR_INVALID_NUMBER
      );
      done();
    });

    test('Should correctly return 1 when no number provided', (done) => {
      assert.equal(convertHandler.getNum('kg'), 1);
      assert.equal(convertHandler.getNum('lbs'), 1);
      done();
    });
  });

  suite('Validate Input Unit', () => {
    test('Should read the unit in the input', (done) => {
      assert.equal(convertHandler.getUnit('5kg'), 'kg');
      assert.equal(convertHandler.getUnit('34lbs'), 'lbs');
      done();
    });

    test('Should correctly return an error due to invalid input unit', (done) => {
      assert.startsWith(convertHandler.getUnit('5.3k'), ERROR_INVALID_UNIT);
      assert.startsWith(convertHandler.getUnit('34.13'), ERROR_INVALID_UNIT);
      done();
    });

    test('Should correctly return the correct return unit', (done) => {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      done();
    });

    test('Should correctly return the spelled-out string unit', (done) => {
      assert.equal(
        convertHandler.getString(1, 'kg', 2.20462262, 'lbs'),
        '1 kilograms converts to 2.20462262 pounds'
      );
      assert.equal(
        convertHandler.getString(1, 'L', 0.26417, 'gal'),
        '1 liters converts to 0.26417 gallons'
      );
      done();
    });
  });

  suite('Validate Convertion', () => {
    test('Should correctly convert km to mi', (done) => {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137);
      assert.equal(convertHandler.convert(34.13, 'km'), 21.20745);
      done();
    });

    test('Should correctly convert mi to km', (done) => {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
      assert.equal(convertHandler.convert(34.13, 'mi'), 54.92677);
      done();
    });

    test('Should correctly convert kg to lbs', (done) => {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
      assert.equal(convertHandler.convert(34.13, 'kg'), 75.24383);
      done();
    });

    test('Should correctly convert lbs to kg', (done) => {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
      assert.equal(convertHandler.convert(34.13, 'lbs'), 15.48109);
      done();
    });

    test('Should correctly convert gal to L', (done) => {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
      assert.equal(convertHandler.convert(34.13, 'gal'), 129.19604);
      done();
    });

    test('Should correctly convert L to gal', (done) => {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417);
      assert.equal(convertHandler.convert(34.13, 'L'), 9.0162);
      done();
    });
  });
});
