// Replace with your OpenWeatherMap API key
const apiKey = 'b172dcf125c704422a52be668c0c6bba'; 

// Function to fetch weather based on user input location
function fetchWeather() {
    const location = document.getElementById('location').value;
    if (location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => alert('Unable to retrieve weather data. Please try again.'));
    } else {
        alert('Please enter a location');
    }
}

// Function to get the user's current location and fetch weather data
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => alert('Unable to retrieve weather data. Please try again.'));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to display weather details on the page
function displayWeather(data) {
    if (data.cod === 200) {
        const weatherData = `
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather-data').innerHTML = weatherData;
    } else {
        alert('Location not found. Please try again.');
    }
}
