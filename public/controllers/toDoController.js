var bodyParser = require('body-parser');

var mongoose = require('mongoose'); //mongodb
mongoose.connect('mongodb://localhost:27017/todo'); //connection string

//create schema, this is like a blue print of our data
var todoSchema = new mongoose.Schema({
    item: String

});

var Todo = mongoose.model('todo-list',todoSchema); //model
/*var item1 = Todo({item: 'get milk'}).save(function (err){
    if (err) {
            throw err;
        }
        else {console.log('item saved');}
});
above code is a dummy data*/

var data = [];

var urlencodedParser = bodyParser.urlencoded({extended: false}); //middleware in the post request

module.exports = function (app) {
    app.get('/todo', function (req, res){     //todo.ejs is the view for this 
        //get data from mongo db and pass it to the view
        Todo.find({}, function (err, data){ //here the data is coming from monngo
            if(err) throw err;
            res.render('todo', {todos: data});
        }); //get all items, its the mongodb function

        //res.render('todo', {todos: data}); //takes view name

    });

    app.post('/todo', urlencodedParser , function (req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        });
            //data.push(req.body);
            // res.json(data);
            console.log(data);
    });

    app.delete('/todo/:item', function (req, res){

        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function (err,data){
            if (err) throw err;
            res.json(data); //deletes it and passes the updated data
        }); 

        
        //use the below when there is no database, static project
        /*  data = data.filter(function (todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
        */

    });

};