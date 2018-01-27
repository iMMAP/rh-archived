var assert = require('assert');
var reportsService = require('../services/reports/reports.js');
// var openwhisk = require('openwhisk');
// var ow;

describe('report', function () {
  it('should throw an error when Query is not present', function () {
    var params = {}

    return reportsService.report(params).then(function (result) {
      assert(false);
    }).catch(function (err) {
      assert(true);
    });
  });
});

describe('report', function () {
  it('should return Report object with name = report 4', function () {
    var params = { query: '{ report("id": "4") { "name" } }' };

    return reportsService.report(params).then(function (result) {
      assert.notEqual(result.payload, undefined);
      assert.notEqual(result.payload.report, undefined);
      assert.equal(result.payload.report.name, 'report 4' );
    })
  });
});

describe('reports', function () {
  it('should return all list of Report objects when Query is not present', function () {
    // var params = { query: '{ report(id: \'4\') { name } }' };
    var params = {};

    return reportsService.reports(params).then(function (result) {
      assert.notEqual(result.payload, undefined);
      assert.notEqual(result.payload.reports, undefined);
      assert.notEqual(result.payload.reports.length, 0);
      assert.equal(result.payload.reports[0].name, 'report 4' );
    })
  });
});