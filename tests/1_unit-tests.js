const chai = require('chai');
chai.use(require('chai-string'));
const { suite } = require('mocha');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const ERR_INVALID_NUMBER = 'invalid number';
const ERR_INVALID_UNIT = 'invalid unit';

suite('Unit Tests', function () {
  suite('Validate Input Number', function () {
    test('should read the numbers in the input', () => {
      assert.equal(convertHandler.getNum('5kg'), 5);
      assert.equal(convertHandler.getNum('34lbs'), 34);
    });
    test('should read the decimal numbers in the input', () => {
      assert.equal(convertHandler.getNum('5.3kg'), 5.3);
      assert.equal(convertHandler.getNum('34.13lbs'), 34.13);
    });
    test('should read the fractial in the input', () => {
      assert.equal(convertHandler.getNum('3/5kg'), 0.6);
      assert.equal(convertHandler.getNum('13/34lbs'), 0.38235);
    });
    test('should read the fractial with decimal in the input', () => {
      assert.equal(convertHandler.getNum('3.1/5kg'), 0.62);
      assert.equal(convertHandler.getNum('13.1/34lbs'), 0.38529);
    });
    test('should correctly return an error due to double fraction', () => {
      assert.equal(convertHandler.getNum('3./1//5kg'), ERR_INVALID_NUMBER);
      assert.equal(
        convertHandler.getNum('13.1/34/13.1lbs'),
        ERR_INVALID_NUMBER
      );
    });
    test('should correctly return 1 when no number provided', () => {
      assert.equal(convertHandler.getNum('kg'), 1);
      assert.equal(convertHandler.getNum('lbs'), 1);
    });
  });

  suite('Validate Input Unit', function () {
    test('should read the unit in the input', () => {
      assert.equal(convertHandler.getUnit('5kg'), 'kg');
      assert.equal(convertHandler.getUnit('34Lbs'), 'lbs');
    });
    test('should correctly return an error due to invalid input unit', () => {
      assert.startsWith(convertHandler.getUnit('5.3k'), ERR_INVALID_UNIT);
      assert.startsWith(convertHandler.getUnit('34.13'), ERR_INVALID_UNIT);
    });
    test('should correctly return the correct return unit', () => {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('gal'), 'l');
      assert.equal(convertHandler.getReturnUnit('l'), 'gal');
    });
    test('should correctly return the spelled-out string unit', () => {
      assert.equal(
        convertHandler.getString(1, 'kg', 2.20462262, 'lbs'),
        '1 kilograms converts to 2.20462262 pounds'
      );
      assert.equal(
        convertHandler.getString(1, 'L', 0.26417, 'gal'),
        '1 liters converts to 0.26417 gallons'
      );
    });
  });

  suite('validate Convertion', function () {
    test('should correctly convert km to mi', function () {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137);
      assert.equal(convertHandler.convert(34.13, 'km'), 21.20745);
    });

    test('should correctly convert mi to km', function () {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
      assert.equal(convertHandler.convert(34.13, 'mi'), 54.92677);
    });

    test('should correctly convert kg to lbs', function () {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
      assert.equal(convertHandler.convert(34.13, 'kg'), 75.24383);
    });

    test('should correctly convert lbs to kg', function () {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
      assert.equal(convertHandler.convert(34.13, 'lbs'), 15.48109);
    });

    test('should correctly convert gal to L', function () {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
      assert.equal(convertHandler.convert(34.13, 'gal'), 129.19604);
    });

    test('should correctly convert L to gal', function () {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417);
      assert.equal(convertHandler.convert(34.13, 'L'), 9.0162);
    });
  });
});
