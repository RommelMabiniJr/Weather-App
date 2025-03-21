import WeatherApiModule from './weatherApi.js';
import { WeatherData } from './weather.js';

const DOM = (function(document) {
    let weather;
    let currentCard = 0;
    const CARD_WIDTH = 180;

    const _searchBarElem = document.querySelector(".search-bar");
    const _searchBtnElem = document.querySelector(".search-btn");

    const _dayConditionHeader = document.querySelector(".day-condition");
    const _dayDescriptionSubHeader = document.querySelector(".day-description");

    const _statTempElem = document.querySelector(".temp")
    const _statHumidElem = document.querySelector(".humid")
    const _statFeelsLikeElem = document.querySelector(".feelslike")
    const _statWindElem = document.querySelector(".wind")

    const _locationElement = document.querySelector(".location")

    const _backgroundElement = document.querySelector(".weather-background");
    const _transparentBgElement = document.querySelector(".main-info-container");
    const _mainContainer = document.querySelector(".main-container");
    const _searchIcon = document.querySelector(".search-icon");
    const _cardsContainer = document.querySelector(".cards-container");
    const _cards = document.querySelectorAll(".card");
    const _nextSlideBtn = document.querySelector(".next-slider-container");
    const _prevSlideBtn = document.querySelector(".prev-slider-container");
    const _prevSlideIcon = document.querySelector(".prev-slider-btn");
    const _nextSlideIcon = document.querySelector(".next-slider-btn");

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

        _nextSlideBtn.addEventListener("click", goNextCardSlide);
        _prevSlideBtn.addEventListener("click", goPrevCardSlide);
    }

    const updateUI = () => {
        _dayConditionHeader.innerText = weather.conditions;
        _dayDescriptionSubHeader.innerText = weather.description;

        _statTempElem.innerText = `${weather.temperature} °C`;
        _statFeelsLikeElem.innerText = `FEELS LIKE: ${weather.feelslike} °C`;
        _statHumidElem.innerText = `HUMIDITY: ${weather.humidity} %`;
        _statWindElem.innerText = `WIND GUST: ${weather.windgust} km/h | WIND SPEED: ${weather.windspeed} km/h`;
        _locationElement.innerText = `- ${weather.location}`

        setBackground(`${weather.conditions.slice(0, weather.conditions.indexOf(","))}`)
    }

    const setBackground = (condition) => {
        console.log(condition)
        const black = 'var(--black)';
        const white = 'var(--white)';
        const darkOpacity = 'var(--dark-transparent)';
        const lightOpacity = 'var(--light-transparent)';

        let backgroundUrl = '', overlayColor = '', textColor = '';

        switch(condition) {
            case 'Clear':
                backgroundUrl = 'url(./src/assets/imgs/clear.jpg)';
                overlayColor = lightOpacity;
                textColor = black;
                break;
            case 'Partially cloudy':
                backgroundUrl = 'url(./src/assets/imgs/partially-cloudy.jpg)';
                overlayColor = lightOpacity;
                textColor = black;
                break;
            case 'Overcast':
                backgroundUrl = 'url(./src/assets/imgs/overcast.jpg)';
                overlayColor = darkOpacity;
                textColor = white;
                break;
            case 'Rain':
                backgroundUrl = 'url(./src/assets/imgs/rain-2.jpg)';
                overlayColor = darkOpacity;
                textColor = white;
                break;
            case 'Snow':
                backgroundUrl = 'url(./src/assets/imgs/snow.jpg)';
                overlayColor = lightOpacity;
                textColor = black;
                break;
            default:
                backgroundUrl = 'url(./src/assets/imgs/default.jpg)';
                overlayColor = lightOpacity;
                textColor = black;
        }

        // Set image background
        _backgroundElement.style.backgroundImage = backgroundUrl;

        // Set CSS variable for overlay color
        _backgroundElement.style.setProperty('--overlay-color', overlayColor);
        _transparentBgElement.style.backgroundColor = overlayColor;
        _searchBarElem.style.backgroundColor = overlayColor;
        _searchBtnElem.style.backgroundColor = overlayColor;
        _searchIcon.src = (overlayColor == lightOpacity) ?  "./src/assets/icons/magnifying-glass-black.svg" : "./src/assets/icons/magnifying-glass-white.svg";

        _cards.forEach(card => {
            card.style.backgroundColor = overlayColor;
        });
        _nextSlideBtn.style.backgroundColor = overlayColor;
        _prevSlideBtn.style.backgroundColor = overlayColor;

        _nextSlideIcon.src = (overlayColor == lightOpacity) ? "./src/assets/icons/right-chevron-black.png" : "./src/assets/icons/right-chevron-white.png"
        _prevSlideIcon.src = (overlayColor == lightOpacity) ? "./src/assets/icons/left-chevron-black.png" : "./src/assets/icons/left-chevron-white.png"

        // Apply color change to text
        _mainContainer.style.color = textColor;
    }

    const goNextCardSlide = () => {
        if(_cards.length === 0) return; //exit if no cards exists

        const cardWidth = _cards[0].offsetWidth + 40; // Width of a single card
        const containerWidth = _cardsContainer.offsetWidth; // Width of the container
        const totalCards = _cards.length + 2; // Total number of cards
        const visibleCards = Math.floor(containerWidth / cardWidth); // Calculate the number of visible cards
        const maxLeft = -(cardWidth * (totalCards - visibleCards)); // Maximum negative left value

         // Get the current left position
        const currentLeft = parseInt(getComputedStyle(_cardsContainer).left, 10) || 0;

        // Calculate the new left position
        const newLeft = Math.max(currentLeft - cardWidth, maxLeft); // Ensure it doesn't go beyond maxLeft

        // Apply the new left position
        _cardsContainer.style.left = `${newLeft}px`;
    }

    const goPrevCardSlide = () => {
        if(_cards.length === 0) return; //exit if no cards exists


        const cardWidth = _cards[0].offsetWidth + 40; // Width of a single card
        const currentLeft = parseInt(getComputedStyle(_cardsContainer).left, 10) || 0; // Current left position

        // Calculate the new left position (prevent sliding beyond the starting point)
        const newLeft = Math.min(currentLeft + cardWidth, 0);

        // Apply the new left position
        _cardsContainer.style.left = `${newLeft}px`;
    }

    return {
        setupListeners,
    }
})(document);

export default DOM;