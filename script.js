const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const unitBtn = document.querySelector("#unit-btn");

const weatherContainer = document.querySelector("#weather-container");
const h1 = document.createElement("h1");
const h2 = document.createElement("h2");
const p = document.createElement("p");

async function fetchWeather(search) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=FRKPALS6NRC22D5HDJUWEA5ZA`);
        const data = await response.json();

        clearWeatherContainer();
        renderWeather(data);
    } catch (error) {
        clearWeatherContainer();
        renderError();
    };
};

const clearWeatherContainer = () => weatherContainer.innerHTML = "";

function renderWeather(data) {
    const address = h1.cloneNode();
    address.innerText = data.resolvedAddress;
    weatherContainer.append(address);

    const temp = h2.cloneNode();
    temp.innerText = `Temp: ${data.currentConditions.temp}`;
    weatherContainer.append(temp);

    const feelsLike = h2.cloneNode();
    feelsLike.innerText = `Feels Like: ${data.currentConditions.feelslike}`;
    weatherContainer.append(feelsLike);

    const humidity = h2.cloneNode();
    humidity.innerText = `Humidity: ${data.currentConditions.humidity}`;
    weatherContainer.append(humidity);

    const description = p.cloneNode();
    description.innerText = data.description;
    weatherContainer.append(description);
};

function renderError() {
    const errMsg = h1.cloneNode();
    errMsg.innerText = "Location not found, please try again";
    weatherContainer.append(errMsg);
};

const clearSearch = () => searchInput.value = "";

searchBtn.addEventListener("click", () => {
    fetchWeather(searchInput.value);
    clearSearch();
});

addEventListener("keydown", (e) => {
    if (searchInput === document.activeElement && e.key === "Enter") {
        fetchWeather(searchInput.value);
        clearSearch();
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