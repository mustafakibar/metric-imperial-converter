'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const hasNumErr = initNum.startsWith('invalid');

    const initUnit = convertHandler.getUnit(input);
    const hasUnitErr = initUnit.startsWith('invalid');

    if (hasNumErr && hasUnitErr) {
      return res.status(422).send('invalid number and unit');
    } else if (hasNumErr) {
      return res.status(422).send('invalid number');
    } else if (hasUnitErr) {
      return res.status(422).send('invalid unit');
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
