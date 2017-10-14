require("mocha-allure-reporter");

const { expect } = require("chai");
var Promise = require('promise');
var Hubdb = require("hubdb");


var db = Hubdb({
 token: '',
 username: 'benlau',
 repo: 'qtbugstatus',
 branch: 'db'
});

before(function() {
    
    var promise = new Promise(function (resolve, reject) {
        
        db.list(function(err, res) {
            console.log("loaded");
            if (err) {
                console.log(err);
                return;
            }

            console.log(res);
            resolve();
        });
    });

    return promise;
});


describe("simple test demo 2", () => {
  // Example of step definition. `allure.createStep` wraps any function and then every
  // call of it will be recorded and displayed in report.
  const testStep = allure.createStep("initial", () => {
    // do something
  });
  // If step will throw an exception or return a rejected promise, it will be marked as broken
  // in the report, and also  will fail the test
  const stepToBreak = allure.createStep("break test", () => {
    throw new Error("Make test broken");
  });

  it("simple passed test", () => {
    testStep();
  });

  it("test with step", () => {
    testStep();
    stepToBreak();
  });

  it("failed test", () => {
    expect(false).to.equal(true);
  });
});