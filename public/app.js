var express = require('express');
var toDoController = require('./controllers/toDoController');
var app = express();

//setting up a view engine
app.set('view engine','ejs');

//middleware for static files
app.use(express.static(__dirname + '/assets')); //it isn`t route specific, used for all eg:css file will be picked up from the public folder

//fire controller, taking this function from toDoController.js
toDoController(app);

console.log(__dirname);


//listen to port
app.listen(3000);
console.log('listening on port 3000');