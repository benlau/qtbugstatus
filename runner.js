require("mocha-allure-reporter");

const { expect,assert } = require("chai");
var Promise = require('promise');
var Hubdb = require("hubdb");
const path = require("path");
var shell = require("shelljs");

var content = shell.ls(__dirname + "/data/*.json").map((file) => { 
    return JSON.parse(shell.cat(file).toString());
});

for (var i in content) {
    (function(suite) {
        describe(suite.name, function() {
            for (var j in suite.tests) {
                (function (test) {
                    it(test.name, function() {
                        if (!test.pass) {
                            assert.fail(false, true,test.reason ? test.reason : "Error");
                        }
                    });                                
                })(suite.tests[j]);
            }                        
        });
    })(content[i]);
}
