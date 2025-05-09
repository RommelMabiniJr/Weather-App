const WeatherApiModule = (() => {
    let currentWeatherData;

    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const apiKey = 'ZQSP7XKVZVQ2L39M5EN9PKTKF';
    const unitGroup = "metric";
    const contentType = "json";
    
    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`${baseURL}${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}&contentType=${contentType}`);
            
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }

            currentWeatherData = cleanWeatherData(await response.json());
            return {...currentWeatherData, location: location};
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching weather data");
        }
    };

    const fetchWeatherDataDummy = async (location = "Ormoc", weather = "rain") => {
        try {
            const response = await fetch(`./src/data/${weather}.json`);
            if (!response.ok) {
                throw new Error(`Error fetching dummy data: ${response.statusText}`);
            }

            currentWeatherData = await response.json();
            return {...currentWeatherData, location: location};
        } catch (error) {
            console.error("Error fetching dummy data:", error);
            throw error; // Rethrow error for handling outside if needed
        }
    };

    const cleanWeatherData = (weatherData) => {
        if (!weatherData) return;

        return {
            days: weatherData.days,
            description: weatherData.description,
            address: weatherData.address,
            resolvedAddress: weatherData.resolvedAddress,
            timezone: weatherData.timezone,
        };
    };

    return {
        fetchWeatherData,
        fetchWeatherDataDummy,
    };
})();

export default WeatherApiModule;