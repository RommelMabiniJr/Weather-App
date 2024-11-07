export const WeatherData = (
    location,
    conditions,
    icon,
    description, 
    temperature, 
    feelslike, 
    humidity, 
    windgust, 
    windspeed
) => {
    let day = {
        conditions,
        icon,
        description
    };

    let stat = {
        temperature, 
        feelslike,
        humidity,
        windgust,
        windspeed
    };

    return {
        location,
        day,
        stat
    };
};
