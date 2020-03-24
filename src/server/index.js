let projectData = {};

const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const request = require('request');

const app = express();
const fetch = require("node-fetch");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

app.get('/', function (req, res){
    var path = require('path');
    // res.sendFile(path.resolve('dist/index.html'));
    res.sendFile('./dist/index.html');
})

var port = process.env.PORT || 3003;
app.listen(port, function(){
    console.log('Example app listening on port: ' + port + '!');
});

// API FUNCTIONS

// GENONAMES API
app.post('/geonames/place', (req, res) =>{
    console.log(req.body);
    request(
        {url: process.env.GEONAME_API_URL + req.body.location + process.env.GEONAME_USERNAME},
        (error, response, body) => {
            if(error || response.statusCode !== 200){
                return resolve.status(500).json({ type: 'error', message: err.message});
                console.log(error);
            }
            projectData.geoname = JSON.parse(body).postalCodes[0];
            res.send("Place saved");
        }
    )
})

app.get('/geonames/getPlace', (req, res) => {
    if(projectData != null && projectData.geoname != null){
        res.send(projectData.geoname);
    }
    else{
        res.send("No geoname saved");
    }
})

// DARK SKY API
app.post('/darksky/forecast', (req, res) => {
    console.log(req.body);
    request(
            {url: process.env.DARK_SKY_API_URL + req.body.lat + "," + req.body.lng 
             + "," + req.body.start + "?exclude=currently,minutely,hourly,flags&units=si"},
            (error, response, body) => {
            if(error || response.statusCode !== 200){
                return resolve.status(500).json({ type: 'error', message: err.message});
                console.log(error);
            }

            projectData.weather = JSON.parse(body).daily.data[0];

            // res.json(JSON.parse(body));
            res.send("Weather forecast saved");
        }
    )
})

app.get('/darksky/getForecast', (req, res) => {
    if(projectData != null && projectData.weather != null){
        res.send(projectData.weather);
    }
    else{
        res.send("No weather saved");
    }
})

// PIXABAY API
app.post('/pixabay/image', (req, res) => {
    request(
            {url: process.env.PIXABAY_API_URL + "&q=" + req.body.destination + "&image_type=photo&orientation=horizontal"},// req.body.lat + "," + req.body.lng 
            //  + "," + req.body.start + "?exclude=currently,minutely,hourly,flags"},
            (error, response, body) => {
            if(error || response.statusCode !== 200){
                return resolve.status(500).json({ type: 'error', message: err.message});
                console.log(error);
            }
            projectData.image = JSON.parse(body).hits[0];
            // res.json(JSON.parse(body));
            res.send("Image saved");
        }
    )
})


app.get('/pixabay/getImage', (req, res) => {
    if(projectData != null && projectData.image != null){
        res.send(projectData.image);
    }
    else{
        res.send("No weather saved");
    }
})



const retrieveData = async(url='') => {
    const request = await fetch(url);
    try{
        // transform retrieved data into json
        const allData = await request.json();
        return allData;
    }
    catch(error){
        console.log("error: " + error);
    }
};