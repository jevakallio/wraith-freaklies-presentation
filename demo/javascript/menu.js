module.exports = function(casper, imageName) {

    'use strict';

    // do anything to the page here...
    casper.wait(2000, function() {
        console.log('waited');
    });

    casper.then(function() {
        casper.captureSelector(imageName, '#menu');
    });
};