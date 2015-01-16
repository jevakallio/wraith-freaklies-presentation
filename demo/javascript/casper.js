/*jshint node:true*/

var casper = require('casper').create();

var url = casper.cli.get(0);
var viewportWidth = casper.cli.get(1);
var imageName = casper.cli.get(2);
var selector = casper.cli.get(3);

casper.start(url, function() {

  this.viewport(viewportWidth, viewportWidth * 2).then(function(){

    // capture the whole page
    if(!selector) {
        this.wait(2000, function() {
            this.capture(imageName);
            console.log('Snapping entire page ' + url + ' at width ' + viewportWidth);
        });
    }

    // capture a section of the page by a selector
    else if(selector.indexOf('javascript/') !== 0) {
        this.wait(2000, function() {
            this.captureSelector(imageName, selector);
            console.log('Snapping selector ' + selector + ' from ' + url + ' at width ' + viewportWidth);
        });
    }

    // let handler handle
    else {
        console.log('Deferring to handler ' + selector);
        require('./' + selector)(this, imageName);
    }

  });
});

casper.run();
