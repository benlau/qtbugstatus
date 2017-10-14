require("mocha-allure-reporter");

const { expect } = require("chai");
var Promise = require('promise');
var Hubdb = require("hubdb");
const path = require("path");
var shell = require("shelljs");

console.log(__dirname + "/data/*.json");
var content = shell.ls(process.cwd() + "/*.json").map((file) => { 
    return JSON.parse(shell.cat(file).toString());
});

for (var i in content) {
    (function(suite) {
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
