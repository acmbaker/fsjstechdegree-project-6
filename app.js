const e = require('express');
const express = require('express');
const app = express();

//Parse in the JSON file data
const fs = require('fs');
let rawdata = fs.readFileSync('data/data.json');
let { projects } = JSON.parse(rawdata);

//Set view engine to pug
app.set('view engine', 'pug');

//Serve public folder to /static
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;

    if (projects[id-1]) {
        res.render('project', {project: projects[id-1]});
    } else {
        res.status = 404;
        res.render('page-not-found');
    }
});

app.use((req, res, next) => {
    const err = new Error('Page not found.');
    console.log('Page not found');
    err.status = 404;
    res.status = 404;
    res.render('error', {err})
});


app.listen(3000, () => {
    console.log('Site is running on localhost:3000')
});