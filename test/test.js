/*
*
*
* Tests runner
*
*/

// Dependencies
const lib =  require('../app/lib');
const  assert = require('assert');


// Aplication logic for the test runner
_app = {};


// Container for the tests
_app.test = {

    'unit': {}
}

_app.test.unit['lib.sum should return a number'] = function(done) {
    const value = lib.sum();
    assert.equal(typeof value, 'number');

    done();
    
}
_app.test.unit['lib.getString should return a number'] = function(done) {
    const value = lib.getString();
    assert.equal(typeof value, "string");

    done();
    
}

_app.test.unit['lib.getString should return four numbers'] = function(done) {
  const value = lib.getString();
  assert.equal(typeof value, "string");

  done();
  
}


_app.test.unit['lib.date should return a string'] = function(done) {
    const value = lib.date();
    assert.equal(typeof value, 'number');
    done();
      
}

_app.test.unit['lib.isValid should Return a boolen value'] = function(done) {

    const value = lib.isValid();
    assert.equal(typeof value, 'boolean' );
    done();
}

// Count all the tests
_app.countTests = function(){
    var counter = 0;
    for(var key in _app.test){
       if(_app.test.hasOwnProperty(key)){
         var subTests = _app.test[key];
         for(var testName in subTests){
            if(subTests.hasOwnProperty(testName)){
              counter++;
            }
         }
       }
    }
    return counter;
  };
_app.runTests = function () {
    let errors = [];
    let successes = 0;
    let limit = _app.countTests();
    let counter = 0;

    for(let key in _app.test) {
        if(_app.test.hasOwnProperty(key)) {

            const subTest = _app.test[key];

            for (let testName in subTest) {

                if(subTest.hasOwnProperty(testName)) {

                    (function(){
                        var tmpTestName = testName;
                        var testValue = subTest[testName];
                        // Call the test
                        try{
                          testValue(function(){
                            // If it calls back without throwing, then it succeeded, so log it in green
                            console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                            counter++;
                            successes++;
                            if(counter == limit){
                              _app.produceTestReport(limit,successes,errors);
                            }
                          });
                        } catch(e){
                          // If it throws, then it failed, so capture the error thrown and log it in red
                          errors.push({
                            'name' : testName,
                            'error' : e
                          });
                          console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                          counter++;
                          if(counter == limit){
                            _app.produceTestReport(limit,successes,errors);
                          }
                        }
                      })();


                }


            };
        }
    }

}


// Product a test outcome report
_app.produceTestReport = function(limit,successes,errors){
    console.log("");
    console.log("--------BEGIN TEST REPORT--------");
    console.log("");
    console.log("Total Tests: ",limit);
    console.log("Pass: ",successes);
    console.log("Fail: ",errors.length);
    console.log("");
  
    // If there are errors, print them in detail
    if(errors.length > 0){
      console.log("--------BEGIN ERROR DETAILS--------");
      console.log("");
      errors.forEach(function(testError){
        console.log('\x1b[31m%s\x1b[0m',testError.name);
        console.log(testError.error);
        console.log("");
      });
      console.log("");
      console.log("--------END ERROR DETAILS--------");
    }
  
  
    console.log("");
    console.log("--------END TEST REPORT--------");
  
  };


// Run the tests
_app.runTests();





