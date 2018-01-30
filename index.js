var express = require('express'),
	app 	= express(),
	bodyParser = require("body-parser");

var todoRoutes = require('./routes/todo');
	 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));

app.use('/api/todos',todoRoutes);

app.get('/',function(req,res){
	res.sendFile("index.html");
});
app.listen(3000,function(){
	console.log("Began @ 3000");
});