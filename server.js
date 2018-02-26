const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
        console.log('Unable to append to server.log');
    }
});
next();

});

// app.use((req, res, next) => {
// res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/', (req,res) => {
// res.send('<h1>Hello Express</h1>');
res.render('home.hbs', {
    pageTitle: 'Home Page',
    homeMessage: 'Welcome Home! Amigos'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
res.send({
    errorMessage : 'This is an error message in JSON'
});
});

app.get('/Cricket', (req, res) => {
    res.send('Virat Kohli Scores A Century!');
    });

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});