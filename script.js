const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:first-child");
const dateField = document.querySelector(".time_location p:last-child");
const weatherField = document.querySelector(".condition p:last-child");
const searchfield = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Lucknow';

const fetchResults = async (targetLocation) => {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=552fd3e8a5a24bbaab990814241610&q=${targetLocation}&aqi=no`;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch weather data for ${targetLocation}.`);
        }
        
        const data = await res.json();

        // Update DOM with fetched data
        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        locationField.textContent = locationName;
        dateField.textContent = time;
        temperatureField.textContent = `${temp}°C`;
        weatherField.textContent = condition;

    } catch (error) {
        console.error(error);
        alert("Unable to fetch data. Please check the location name or try again later.");
    }
};

function searchForLocation(e) {
    e.preventDefault();
    target = searchfield.value.trim();
    if (target) {
        fetchResults(target);
        searchfield.value = ''; // Clear the search field
    } else {
        alert("Please enter a location!");
    }
}

// Initial fetch for default location
fetchResults(target);
