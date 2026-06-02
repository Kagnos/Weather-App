const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const unitBtn = document.querySelector("#unit-btn");
const weatherContainer = document.querySelector("#weather-container");

let lastSearch;
let unit = "us";

async function fetchWeather(search) {
    try {
        lastSearch = search;
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=${unit}&key=FRKPALS6NRC22D5HDJUWEA5ZA`);
        const data = await response.json();

        renderWeather(data);
    } catch (error) {
        renderError();
    };
};

function updateUnit() {
    switch (unit) {
        case "us":
            unit = "metric";
            return unitBtn.innerText = "°C";
        case "metric":
            unit = "us";
            return unitBtn.innerText = "°F";
    }
};

function renderWeather(data) {
    let tempUnit;

    unit === "metric"
    ? tempUnit = "°C"
    : tempUnit = "°F";

    weatherContainer.innerHTML = `
        <div id="today">
            <h1>${data.resolvedAddress}</h1>
            <h2>Temp: ${data.currentConditions.temp}${tempUnit}</h2>
            <h2>Feels Like: ${data.currentConditions.feelslike}${tempUnit}</h2>
            <h2>Humidity: ${data.currentConditions.humidity}%</h2>
            <p>${data.description}</p>
        </div>

        <div id="hours">
        <h1>${data.days[0].hours[0].temp}</h1>
        </div>

        <div id="week">
        <h1>${data.days[1].temp}</h1>
        </div>
    `;
console.log(data.days[0])
    if (
        unit === "us" && data.currentConditions.temp > 90 ||
        unit === "metric" && data.currentConditions.temp > 32.22
    ) {
        document.body.style.backgroundColor = "#ffac9d";
    } else if (
        unit === "us" && data.currentConditions.temp > 70 ||
        unit === "metric" && data.currentConditions.temp > 21.11
    ) {
        document.body.style.backgroundColor = "#ffe6a0";
    } else if (
        unit === "us" && data.currentConditions.temp > 40 ||
        unit === "metric" && data.currentConditions.temp > 4.44
    ){
        document.body.style.backgroundColor = "#7d967f";
    } else if (
        unit === "us" && data.currentConditions.temp > 10 ||
        unit === "metric" && data.currentConditions.temp > -12.22
    ) {
        document.body.style.backgroundColor = "#afc2cf";
    } else {
        document.body.style.backgroundColor = "#c7c7c7";
    }
    
};

function renderError() {
    weatherContainer.innerHTML = `
        <h1>Location not found, please try again</h1>
    `;

    document.body.style.backgroundColor = "#8f8aa8";
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
        clearSearch();
    };
});

unitBtn.addEventListener("click", () => {
    updateUnit();

    if (lastSearch !== undefined) {
        fetchWeather(lastSearch);
    }
});