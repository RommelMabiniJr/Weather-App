import WeatherApiModule from './weatherApi.js';
import { WeatherData } from './weather.js';

const DOM = (function(document) {
    let weather;

    const _searchBarElem = document.querySelector(".search-bar");
    const _searchBtnElem = document.querySelector(".search-btn");

    const _dayConditionHeader = document.querySelector(".day-condition");
    const _dayDescriptionSubHeader = document.querySelector(".day-description");

    const _statTempElem = document.querySelector(".temp")
    const _statHumidElem = document.querySelector(".humid")
    const _statFeelsLikeElem = document.querySelector(".feelslike")
    const _statWindElem = document.querySelector(".wind")

    const _locationElement = document.querySelector(".location")

    const backgroundElement = document.querySelector(".weather-background");

    const setupListeners = () => {
        _searchBtnElem.addEventListener("click", async () => {
            if (_searchBarElem.value == "") return;

            const data = await WeatherApiModule.fetchWeatherDataDummy(_searchBarElem.value);
            console.log(data)
            
            weather = {
                location: data.resolvedAddress,
                conditions: data.currentConditions.conditions,
                icon: data.icon,
                description: `${data.days[0].description.slice(0, data.days[0].description.indexOf("."))} within ${data.resolvedAddress}. ${data.description.slice(0, data.description.indexOf("."))} is to be expected.`, 
                temperature: data.currentConditions.temp, 
                feelslike: data.currentConditions.feelslike, 
                humidity: data.currentConditions.humidity, 
                windgust: data.currentConditions.windgust, 
                windspeed: data.currentConditions.windspeed
            }

            updateUI();
        })
    }

    const updateUI = () => {
        _dayConditionHeader.innerText = weather.conditions;
        _dayDescriptionSubHeader.innerText = weather.description;

        _statTempElem.innerText = `${weather.temperature} °C`;
        _statFeelsLikeElem.innerText = `FEELS LIKE: ${weather.feelslike} °C`;
        _statHumidElem.innerText = `HUMIDITY: ${weather.humidity} %`;
        _statWindElem.innerText = `WIND GUST: ${weather.windgust} km/h | WIND SPEED: ${weather.windspeed} km/h`;
    
        _locationElement.innerText = `- ${weather.location}`
    }

    const setBackground = () => {
        let backgroundUrl = '';

        switch(condition) {
            case 'Clear':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
                break;
            case 'Partially cloudy':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
                break;
            case 'Overcast':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
                break;
            case 'Rain':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
                break;
            case 'Snow':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
                break;

            default:
                case 'Overcast':
                backgroundUrl = 'url(./src/assets/imgs/imagename)';
        }

        backgroundElement.style.backgroundImage = backgroundUrl;
    }

    return {
        setupListeners,
    }
})(document);

export default DOM;