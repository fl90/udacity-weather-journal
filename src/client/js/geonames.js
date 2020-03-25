
const oneDay = 24 * 60 * 60 * 1000;

function getGeoData(event){
    event.preventDefault();

    let locationName = document.getElementById("zip");
    let startDate = document.getElementById("start-date");
    let endDate = document.getElementById("end-date");
    let start = new Date(startDate.value);
    let end = new Date(endDate.value);

    // fill in the trip dates
    document.getElementById("trip-start-date").innerHTML = start.getDate() + "." + (start.getMonth()+1) + "." + start.getFullYear();
    document.getElementById("trip-end-date").innerHTML = end.getDate() + "." + (end.getMonth()+1) + "." + end.getFullYear();
    
    
    // save location in the server 
    postData('http://localhost:3003/geonames/place',{
        location: locationName.value
    }).then(function(resp){

        // get location data from the server
        retrieveData('http://localhost:3003/geonames/getPlace')
        .then(function(response, error){
            let location = response;

            const diffDays = Math.ceil(Math.abs((start - new Date()) / oneDay));
            const tripLength = calcTripLength(start, end);
            document.getElementById("trip-length").innerHTML = tripLength + " day(s)";
            document.getElementById("destination").innerHTML = locationName.value + ", " + location.countryCode + " is " + diffDays + " day(s) away";
       
            // save weather forecast data to the server
            postData('http://localhost:3003/darksky/forecast',{
                lat: location.lat,
                lng: location.lng,
                start: (start.getTime() / 1000)
            }).then(function(resp){

                // get weather forecast data from the server
                retrieveData('http://localhost:3003/darksky/getForecast').then(
                    function(darkSkyResponse, darkSkyError){
                        document.getElementById("trip-weather").innerHTML = darkSkyResponse.summary;
                        document.getElementById("temp-max").innerHTML = darkSkyResponse.temperatureHigh + " C°";
                        document.getElementById("temp-low").innerHTML = darkSkyResponse.temperatureLow + " C°";
                    });
            });

            postData('http://localhost:3003/pixabay/image', {
                destination: locationName.value
            }).then(function(responso){
    
                retrieveData('http://localhost:3003/pixabay/getImage').then(
                    function(pixabayResponse, pixabayError){
                        document.getElementById("trip-image").setAttribute("src", pixabayResponse.webformatURL);
                    });
                });
        });

    });
}

function calcTripLength(start, end){
    let length = Math.ceil(Math.abs((end - start) / oneDay));
    return length;
};

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

export { getGeoData, retrieveData, calcTripLength}