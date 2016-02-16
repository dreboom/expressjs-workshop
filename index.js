var express = require('express');
var app = express();

// // app.get('/', function (req, res) {
// //   res.send('Hello World!');
// // });



// //Exercise 1 - Create a web server that can listen to requests for /hello, and respond with some HTML that says <h1>Hello World!</h1>

// app.get('/hello', function(request, response) {
//   response.send('<h1>Hello World!</h1>');
// });



// //Exercise 2 - Create a web server that can listen to requests for /hello/:firstName, and respond with some HTML that says <h1>Hello _name_!</h1>.

// app.get('/hello/:firstName', function(request, response) {
//   var firstName = request.params.firstName;
//   response.send('<h1>Hello ' + firstName + '!</h1>');
// });



// //Exercise 3 - Create a web server that can listen to requests for /op/:operation/:number1/:number2 and respond with a JSON object
// //Your program should work for add,sub,mult,div and return the appropriate solution using response.json 
// //(this function will automatically JSON.stringify anything you give it). 
// //If operation is something other than these 4 values, you should use res.sendStatus to send an appropriate error code.


// app.get('/op/:operation/:number1/:number2', function(request, response) {

//   var num1 = Number(request.params.number1);
//   var num2 = Number(request.params.number2);
//   var answer;
//   switch (request.params.operation) {
//     case 'add':
//       answer = (num1 + num2);
//       break;
//     case 'sub':
//       answer = (num1 - num2);
//       break;
//     case 'mult':
//       answer = (num1 * num2);
//       break;
//     case 'div':
//       answer = (num1 / num2);
//       break;
//   }
//   var fullObj = {
//     operation: request.params.operation,
//     firstOperand: request.params.number1,
//     secondOperand: request.params.number2,
//     solution: answer
//   };

//   answer ? response.json(fullObj) : response.status(400).send("You messed up!");

// });


//Ziad answer:

//function doOperation (operation, num1, num2) {
//     if (operation === 'add') {
//         return num1 + num 2;
//      else if (operation === 'sub'{
            // return num1 - num2}
        
//         ')
// // }

// app.get('/op/:operation/:number1/:number2', function(request, response) {
// var num1 = parseInt(request.params.number1)
// var num2 = parseInt(request.params.number2)
// try {
//     // var result = doOperation(request.params.operation, request.params.number1, request.params.number2)

// response.json ({
// operation: request.params.opertaion,
// firstOperand: request.params.number1,
// sencondOperand: request.params.number2)
// solution: result
// });
// })

// }
// catch(e) {
//     response.status(400).send(e.message)
//      return;
// }

// response.json ({
// operation: request.params.opertaion,
// firstOperand: request.params.number1,
// sencondOperand: request.params.number2)
// solution: result
// });
// })





//Exercise 4: Retrieving data from our database

var Sequelize = require('sequelize');

var db = new Sequelize('reddit', 'dreboom', undefined, {
    dialect: 'mysql'
});


var User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING // TODO: make the passwords more secure!
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
    upVote: Sequelize.BOOLEAN
});


// function createNewUser(name, pass, callback) {
//     User.create({
//         name: name,
//         password: pass
//             //This is a callback function
//     }).then(function(user) {
//         callback(user);
//     });
// }


// function createNewContent(userId, url, title, callback) {
//     Content.create({
//         userId: userId,
//         url: url,
//         title: title,
//     }).then(function(NewContent) {
//         callback(NewContent);
//     });
// }
// createNewContent(1, 'http://www.google.com', 'google', function(NewContent){console.log(NewContent)});


// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {
    through: Vote,
    as: 'Upvotes'
}); // This will add an `add`
Content.belongsToMany(User, {
    through: Vote
});

// db.sync();



app.get('/contents', function(request, response) {
        Content.findAll({
        limit: 5,
        attributes: ['title', 'url', 'userId']
    }).then(function(returnedContent) {
        
        var listLi = "";
        returnedContent.forEach(function(item){
            listLi = listLi + "<li>Title: "+item.title+"<br>Url: "+item.url+"<br>User: "+item.userId+"</li>"
        })
        var htmlCore = "<div><h1>List of Contents</h1><ul>"+listLi+"</ul></div>";
        listLi.length > 0 ? response.send(htmlCore) : response.send("Check ya shit fool!")
        
    });
});

// function buildHtmlList(arrayOfContents){}
// function retireveTopFiveContents(callback){}
// app.get('/contents', function(request, response) {
//     retrieveTopFiveContents(function(contents) {
//         var html = buildHtmlList(contents);
        
//         response.send(html);
//     });
// });


//set date = to timestamp(now())


// ======================================================================================



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
