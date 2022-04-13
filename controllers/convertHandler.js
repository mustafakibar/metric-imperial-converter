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

function ConvertHandler() {
  this.getNum = function (inputArg) {
    let input = inputArg ? inputArg.trim() : '';
    if (input) {
      if (input.includes('/')) {
        let fractions = input.replace(/[a-z]/gi, '').split('/');
        if (fractions.length == 2) {
          return (parseFloat(fractions[0]) / parseFloat(fractions[1])).toFixed(
            5
          );
        }
      } else {
        let numMatch = input.match(/[\d\.]+/);
        return numMatch ? numMatch[0] : 1;
      }
    }

    return 'invalid number';
  };

  this.getUnit = function (inputArg) {
    let input = inputArg ? inputArg.trim() : '';
    if (input) {
      let unitMatch = input.match(/[a-zA-Z]+$/);
      if (unitMatch) {
        let unit = unitMatch[0].trim().toLowerCase();
        if (UNITS_BASE.includes(unit)) {
          return unit;
        } else {
          return `invalid unit, ${unit} is not a valid unit and valid units are: ${UNITS_BASE.join(
            ', '
          )}`;
        }
      }
    }

    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    return UNITS_MAPS[UNITS_BASE.indexOf(initUnit.toLowerCase())];
  };

  this.spellOutUnit = function (initUnit) {
    return UNITS_SPLL[UNITS_BASE.indexOf(initUnit.toLowerCase())];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;

    const doMath = () => {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          return parseFloat(initNum * galToL);
        case 'l':
          return parseFloat(initNum / galToL);
        case 'lbs':
          return parseFloat(initNum * lbsToKg);
        case 'kg':
          return parseFloat(initNum / lbsToKg);
        case 'mi':
          return parseFloat(initNum * miToKm);
        case 'km':
          return parseFloat(initNum / miToKm);
        default:
          return 'invalid unit';
      }
    };

    return doMath().toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
