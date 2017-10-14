require("mocha-allure-reporter");

const { expect } = require("chai");
var Promise = require('promise');
var Hubdb = require("hubdb");
const path = require("path");
var shell = require("shelljs");

console.log(process.cwd() + "/*.json");
var content = shell.ls(process.cwd() + "/*.json").map((file) => { 
    return JSON.parse(shell.cat(file).toString());
});

for (var i in content) {
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
    })(content[i]);
}

/*
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
*/