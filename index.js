'use strict';
var path = require('path');
var fs = require('fs');

module.exports = function(content) {
    this.cacheable();
    var callback = this.async();
    var folder = path.resolve(__dirname, 'bin', 'ngux', 'NGUX.exe');
    var resourcePath = this.resourcePath;
    var exec = require('child_process').exec;
    exec('mono ' + folder + ' ' + resourcePath + ' ' + path.dirname(this.resourcePath), function(err, stdout, stderr) {
        if (err) {
            callback(err);
            return;
        }
        var htmlPath = resourcePath.replace('.ngux', '.html');
        var jsPath = resourcePath.replace('.ngux', '.js');
        this.addDependency(path.resolve(htmlPath));
        this.addDependency(path.resolve(jsPath));
        fs.readFile(htmlPath, 'utf8', function(err, htmlContent) {
            callback(null, htmlContent);
        });
    }.bind(this));
};
