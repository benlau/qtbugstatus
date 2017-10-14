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

            for (var i in res) {
                (function(suite) {
                    console.log(suite.name, suite);
                    describe(suite.name, function() {
                        for (var j in suite.tests) {
                            (function (test) {
                                it(test.name, function() {
                                   expect(test.pass).to.equal(true); 
                                });                                
                            })(suite.tests[j]);
                        }                        
                    });
                })(res[i].data);
            }
            
            resolve();
        });
    });

    return promise;
});

it("dummy", function() {
});