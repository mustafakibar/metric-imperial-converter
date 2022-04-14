const UNITS_BASE = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
const UNITS_MAPS = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
const UNITS_SPLL = [
  'gallons',
  'liters',
  'miles',
  'kilometers',
  'pounds',
  'kilograms',
];

const GAL_TO_L = 3.78541;
const MIL_TO_KM = 1.60934;
const LBS_TO_KG = 0.453592;

const ERROR_INVALID_NUMBER = 'invalid number';
const ERROR_INVALID_UNIT = 'invalid unit';

function ConvertHandler() {
  this.getNum = function (inputArg) {
    let input = inputArg ? inputArg.trim() : '';
    if (input) {
      if (input.includes('/')) {
        let fractions = input.replace(/[a-z]/gi, '').split('/');
        if (fractions.length == 2) {
          return eval(
            (parseFloat(fractions[0]) / parseFloat(fractions[1])).toFixed(5)
          );
        }
      } else {
        let numMatch = input.match(/[\d\.]+/);
        return numMatch ? eval(numMatch[0]) : 1;
      }
    }

    return ERROR_INVALID_NUMBER;
  };

  this.getUnit = function (inputArg) {
    let input = inputArg ? inputArg.trim() : '';
    if (input) {
      let unitMatch = input.match(/[a-zA-Z]+$/);
      if (unitMatch) {
        let unit = unitMatch[0].trim().toLowerCase();
        if (UNITS_BASE.includes(unit)) {
          return unit === 'l' ? 'L' : unit;
        } else {
          return `${ERROR_INVALID_UNIT}, ${unit} is not a valid unit and valid units are: ${UNITS_BASE.join(
            ', '
          )}`;
        }
      }
    }

    return ERROR_INVALID_UNIT;
  };

  this.getReturnUnit = function (initUnit) {
    const result = UNITS_MAPS[UNITS_BASE.indexOf(initUnit.toLowerCase())];
    return result === 'l' ? 'L' : result;
  };

  this.spellOutUnit = function (initUnit) {
    return UNITS_SPLL[UNITS_BASE.indexOf(initUnit.toLowerCase())];
  };

  this.convert = function (initNum, initUnit) {
    const calculate = () => {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          return parseFloat(initNum * GAL_TO_L);
        case 'l':
          return parseFloat(initNum / GAL_TO_L);
        case 'lbs':
          return parseFloat(initNum * LBS_TO_KG);
        case 'kg':
          return parseFloat(initNum / LBS_TO_KG);
        case 'mi':
          return parseFloat(initNum * MIL_TO_KM);
        case 'km':
          return parseFloat(initNum / MIL_TO_KM);
        default:
          return parseFloat(initNum / miToKm);
      }
    };

    return Number(calculate().toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = {
  ConvertHandler,
  ERROR_INVALID_NUMBER,
  ERROR_INVALID_UNIT,
};
