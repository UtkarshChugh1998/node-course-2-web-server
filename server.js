// Creating web server
// First we need to load in Express
const express = require('express'),
	fs = require('fs'),
	hbs = require('hbs');
// To use express framework, we write following statement.
var app = express();

hbs.registerPartials(__dirname+'/views/partials');

// If some dynamic data needs to be passed to 
// multiple pages, then instead of passing it individually
// at fo all pages, we can pass all in one using registerHelper
hbs.registerHelper('getYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use( (req, res, next)=>{
	var now = new Date().toString();
	console.log(now);
	var log = `${req.method} ${req.path}`;
	var str = `${now} ${log}`;       
	fs.appendFile('./serverRequests.log',str+'\n',(err)=>
		{
			if(err)
			{

			}
		});
	console.log(str);
	next();
});

// rendering the maintenace file in new niddleware.
// req and res in middleware and request handlers are same objects.
app.use((req, res, next)=>{
	res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/public'));
// Setting up HTTP route handlers for handling various HTTP 
// requests at different routes

// Routes are endpoints or URI paths at which apllication serves
// some purpose, based on the HTTP request or route.
// We can send some data back,like HTML page or JSON data.
// Handling get request at root route.
// First argument is route and second argument is the fucntion
// which tells what to send back to user.
// Request object contains info about the request coming in.
// Header, body, 
app.get('/', (req, res)=>{
	res.render('home.hbs',{
		title: 'Home Page',
		welcomeMessage: 'Welcome to Some website',
	});
}); 
app.get('/about',(req, res)=>{
	res.render('about.hbs',{
		title: 'About Page'
	});
});
app.get('/error',(req, res)=>{
	res.send({
		errorMessage: 'Bad Request'
	});
});
// To make app to listen, ie, to bind app to a port in our machine
app.listen(3000);