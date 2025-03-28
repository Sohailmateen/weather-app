import API_KEY from "./config.js";


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    if(!city){
        alert("Please enter a city name.");
        return;
    }
    try {
        const response = await fetch(apiUrl + city + `&appid=${API_KEY}`);

        if(!response.ok){
            throw new Error("City not found");
        }
        
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


        if(data.weather && data.weather.length > 0){
            const weatherCondition = data.weather[0].main;
            const weatherImages = {
                Clouds: "images/clouds.png",
                Clear: "images/clear.png",
                Rain: "images/rain.png",
                Drizzle: "images/drizzle.png",
                Mist: "images/mist.png",
            };
            if (weatherImages[weatherCondition]) {
                weatherIcon.src = weatherImages[weatherCondition];
            }
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch(error){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value.trim());
});