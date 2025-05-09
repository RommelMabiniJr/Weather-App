const HourStatCard = (time, iconSrc, temp, feelsLike) => {
    const card = document.createElement("div");
    card.classList.add("card", "hour-stat");

    const timeElement = document.createElement("p");
    timeElement.classList.add("time");
    timeElement.textContent = time;

    const iconElement = document.createElement("img");
    iconElement.classList.add("sub-weather-icon", "weather-icon");
    iconElement.src = iconSrc;
    iconElement.alt = "Weather Icon";

    const tempContainer = document.createElement("div");
    
    const tempElement = document.createElement("a");
    tempElement.classList.add("sub-temp");
    tempElement.textContent = `${temp} °C`;
    
    const feelsLikeElement = document.createElement("a");
    feelsLikeElement.classList.add("sub-feelslike");
    feelsLikeElement.textContent = `${feelsLike} °C`;

    tempContainer.appendChild(tempElement);
    tempContainer.appendChild(feelsLikeElement);

    card.appendChild(timeElement);
    card.appendChild(iconElement);
    card.appendChild(tempContainer);

    return card;
};

export default HourStatCard;