
/*
*
* Lib simulation test unit
*/

lib = {};



// Return a msg to user
lib.getString = function () {

   return 'hello word';
} 

// Sum two values
lib.sum = function (a,b) {

   const result = a + b;

    return result;
 }
 
 // Verify if value is valid
 lib.isValid = function () {

    return true;
 } 

 lib.date = function() {

   const date = new Date();
   return date.getFullYear();
 }
  

// Export module
module.exports = lib;