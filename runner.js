require("mocha-allure-reporter");

const { expect,assert } = require("chai");
var Promise = require('promise');
const path = require("path");
var shell = require("shelljs");

var content = shell.ls(__dirname + "/data/*.json").map((file) => { 
    var txt =  shell.cat(file).toString();
    txt = txt.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    console.log(file, txt);

    return JSON.parse(txt);
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
