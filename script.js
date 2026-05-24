const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

async function fetchWeather(search) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=FRKPALS6NRC22D5HDJUWEA5ZA`);
        const data = await response.json();
        console.log(data.address)
    } catch (error) {
        console.error(error);
    };
};

searchBtn.addEventListener("click", () => {
    fetchWeather(searchInput.value);
    searchInput.value = "";
});