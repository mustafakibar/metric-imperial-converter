'use strict';

const expect = require('chai').expect;
const {
  ConvertHandler,
  ERROR_INVALID_NUMBER,
  ERROR_INVALID_UNIT,
} = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const hasNumErr = initNum.toString().startsWith(ERROR_INVALID_NUMBER);

    const initUnit = convertHandler.getUnit(input);
    const hasUnitErr = initUnit.startsWith(ERROR_INVALID_UNIT);

    if (hasNumErr && hasUnitErr) {
      return res.json(`${ERROR_INVALID_NUMBER} and unit`);
    } else if (hasNumErr) {
      return res.json(ERROR_INVALID_NUMBER);
    } else if (hasUnitErr) {
      return res.json(ERROR_INVALID_UNIT);
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      ),
    });
  });
};
