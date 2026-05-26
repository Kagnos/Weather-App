const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

async function fetchWeather(search) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=FRKPALS6NRC22D5HDJUWEA5ZA`);
        const data = await response.json();

        renderWeather(data);
    } catch (error) {
        console.error(error);
    };
};

function renderWeather(data) {
    const weatherContainer = document.querySelector("#weather-container");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

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

searchBtn.addEventListener("click", () => {
    fetchWeather(searchInput.value);
    searchInput.value = "";
});