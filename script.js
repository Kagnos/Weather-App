const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const unitBtn = document.querySelector("#unit-btn");
const weatherContainer = document.querySelector("#weather-container");

async function fetchWeather(search) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=FRKPALS6NRC22D5HDJUWEA5ZA`);
        const data = await response.json();

        renderWeather(data);
    } catch (error) {
        renderError();
    };
};

function renderWeather(data) {
    weatherContainer.innerHTML = `
        <h1>${data.resolvedAddress}</h1>
        <h2>Temp: ${data.currentConditions.temp}</h2>
        <h2>Feels Like: ${data.currentConditions.feelslike}</h2>
        <h2>Humidity: ${data.currentConditions.humidity}</h2>
        <p>${data.description}</p>
    `;
};

function renderError() {
    weatherContainer.innerHTML = `
        <h1>Location not found, please try again</h1>
    `;
};

const clearWeatherContainer = () => weatherContainer.innerHTML = "";

const clearSearch = () => searchInput.value = "";

searchBtn.addEventListener("click", () => {
    clearWeatherContainer();
    fetchWeather(searchInput.value);
    clearSearch();
});

addEventListener("keydown", (e) => {
    if (searchInput === document.activeElement && e.key === "Enter") {
        clearWeatherContainer();
        fetchWeather(searchInput.value);
        clearDOM();
    };
});

unitBtn.addEventListener("click", () => {
    switch (unitBtn.dataset.unit) {
        case "fahrenheit":
            unitBtn.dataset.unit = "celsius";
            return unitBtn.innerText = "°C";
        case "celsius":
            unitBtn.dataset.unit = "fahrenheit";
            return unitBtn.innerText = "°F";
    }
});