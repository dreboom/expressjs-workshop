var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });



//Exercise 1 - Create a web server that can listen to requests for /hello, and respond with some HTML that says <h1>Hello World!</h1>

app.get('/hello', function(request, response) {
  response.send('Hello World!');
});



//Exercise 2 - Create a web server that can listen to requests for /hello/:firstName, and respond with some HTML that says <h1>Hello _name_!</h1>.

app.get('/hello/:firstName', function(request, response) {
  var firstName = request.params.firstName;
  response.send('Hello ' + firstName);
});



//Exercise 3 - Create a web server that can listen to requests for /op/:operation/:number1/:number2 and respond with a JSON object
//Your program should work for add,sub,mult,div and return the appropriate solution using response.json 
//(this function will automatically JSON.stringify anything you give it). 
//If operation is something other than these 4 values, you should use res.sendStatus to send an appropriate error code.


app.get('/op/:operation/:number1/:number2', function(request, response) {
  
  var num1 = Number(request.params.number1);
  var num2 = Number(request.params.number2);
  var answer;
  switch (request.params.operation) {
    case 'add':
      answer = (num1 + num2);
      break;
    case 'sub':
      answer = (num1 - num2);
      break;
    case 'mult':
      answer = (num1 * num2);
      break;
    case 'div':
      answer = (num1 / num2);
      break;
  }
  var fullObj = {
    operation: request.params.operation,
    firstOperand: request.params.number1,
    secondOperand: request.params.number2,
    solution: answer
  };

  answer ? response.json(fullObj) : response.status(400).send("You messed up!");

});







/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
