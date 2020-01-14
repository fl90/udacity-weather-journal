/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

const kelvinZero = 273.15;

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '4cd64f1b7cc1a1a130ee7dda260b1789';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
let zipCode = document.getElementById('zip');
let userResponse = document.getElementById('feelings');

/* Function called by event listener */
function performAction(){
    retrieveData(baseURL + zipCode.value + '&APPID=' + apiKey)
    .then(function(data){
        postData('http:localhost:3000/add', {
            temperature : calcTemp(data.main.temp) + ' °C', 
            date: newDate, 
            user_response: userResponse.value})
            .then(function(receivedData){
                updateUI(receivedData)
            })
    });
}

/* function for updating the ui */
function updateUI(data){
    document.getElementById('date').innerHTML = data[data.length - 1].date;
    document.getElementById('temp').innerHTML = data[data.length - 1].temperature;
    document.getElementById('content').innerHTML = data[data.length - 1].user_response;
}

/* function to calc the temperature */
function calcTemp(temp){
    let num = temp - kelvinZero;
    return Number(num.toFixed(2));
}

/* Function to GET Web API Data*/
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

/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

/* Function to GET Project Data */
