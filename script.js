const locationInput = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const stateName = document.querySelector(".state-name");
const countryName = document.querySelector(".country-name");
const locationDate = document.querySelector(".date")
const temperature = document.querySelector(".temperature");
const temp = document.querySelector(".temp-feeslike")
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const Precipitation = document.querySelector(".precip");

const tuesdayMax = document.querySelector(".tue-max");
const tuesdayMin = document.querySelector(".tue");
const wednesdayMax = document.querySelector(".wed-max");
const wednesdayMin = document.querySelector(".wed");
const thursdayMax = document.querySelector(".thu-max");
const thursdayMin = document.querySelector(".thu");
const fridayMax = document.querySelector(".fri-max");
const fridayMin = document.querySelector(".fri");
const saturdayMax = document.querySelector(".sat-max");
const saturdayMin = document.querySelector(".sat");
const sundayMax = document.querySelector(".sun-max");
const sundayMin = document.querySelector(".sun");
const mondayMax = document.querySelector(".mon-max");
const mondayMin = document.querySelector(".mon");

const firstHour = document.querySelector(".hourly-three")
const secondHour = document.querySelector(".hourly-four")
const thirdHour = document.querySelector(".hourly-five")
const fourthHour = document.querySelector(".hourly-six")
const fifthHour = document.querySelector(".hourly-seven")
const sixthHour = document.querySelector(".hourly-eight")
const seventhHour = document.querySelector(".hourly-nine")
const eighthHour = document.querySelector(".hourly-ten")

async function getLocation(query){
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    const result = data.results[0];
    return {
        state: result.name || "",
        country: result.country || "",
        lat: result.latitude,
        lon: result.longitude
    }
}

async function getWeather(location) {
    const {state, country, lat, lon} = await getLocation(location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,is_day&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`)
    const data = await res.json();
    console.log(data);
    let dailyMax = data.daily.temperature_2m_max;
    let dailyMin = data.daily.temperature_2m_min;
    let hourly = data.hourly.temperature_2m;
    stateName.textContent = `${state}, `;
    countryName.textContent = country;
    locationDate.textContent = data.current.time;
    temperature.textContent = (data.current.temperature_2m).toFixed(0) + "°";
    temp.textContent = (data.current.temperature_2m).toFixed(0) + "°";
    humidity.textContent = (data.current.relative_humidity_2m).toFixed(0) + "%";
    windSpeed.textContent = (data.current.wind_speed_10m).toFixed(0) + " mph";
    Precipitation.textContent = (data.current.precipitation).toFixed(0) + " in";


    // Daily forcast
    tuesdayMax.textContent = (dailyMax[0]).toFixed(0) + "°";
    tuesdayMin.textContent = (dailyMin[0]).toFixed(0) + "°";
    wednesdayMax.textContent = (dailyMax[1]).toFixed(0) + "°";
    wednesdayMin.textContent = (dailyMin[1]).toFixed(0) + "°";
    thursdayMax.textContent = (dailyMax[2]).toFixed(0) + "°";
    thursdayMin.textContent = (dailyMin[2]).toFixed(0) + "°";
    fridayMax.textContent = (dailyMax[3]).toFixed(0) + "°";
    fridayMin.textContent = (dailyMin[3]).toFixed(0) + "°";
    saturdayMax.textContent = (dailyMax[4]).toFixed(0) + "°";
    saturdayMin.textContent = (dailyMin[4]).toFixed(0) + "°";
    sundayMax.textContent = (dailyMax[5]).toFixed(0) + "°";
    sundayMin.textContent = (dailyMin[5]).toFixed(0) + "°";
    mondayMax.textContent = (dailyMax[6]).toFixed(0) + "°";
    mondayMin.textContent = (dailyMin[6]).toFixed(0) + "°";

    // hourly forcast
    firstHour.textContent = (hourly[3]).toFixed(0) + "°";
    secondHour.textContent = (hourly[4]).toFixed(0) + "°";
    thirdHour.textContent = (hourly[5]).toFixed(0) + "°";
    fourthHour.textContent = (hourly[6]).toFixed(0) + "°";
    fifthHour.textContent = (hourly[7]).toFixed(0) + "°";
    sixthHour.textContent = (hourly[8]).toFixed(0) + "°";
    seventhHour.textContent = (hourly[9]).toFixed(0) + "°";
    eighthHour.textContent = (hourly[10]).toFixed(0) + "°";
}


searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const query = locationInput.value.trim();
    if(!query){
        alert("please enter a location name");
        return;
    }
    // getLocation(query);
    getWeather(query);
});

// getWeather("Nigeria");