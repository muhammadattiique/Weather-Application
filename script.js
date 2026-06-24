const apiKey = "a84d1700d7b3d65857e114820c1dda9b";

const cityInput =
document.getElementById("cityInput");

const btn =
document.getElementById("getWeatherBtn");

const forecastContainer =
document.getElementById("forecastContainer");

const currentWeather =
document.querySelector(".current-weather");

const loader =
document.getElementById("loader");

const results =
document.getElementById("results");



// BUTTON CLICK

btn.addEventListener(

    "click",

    getWeather

);



// PRESS ENTER

cityInput.addEventListener(

    "keypress",

    (e) => {

        if (e.key === "Enter") {

            getWeather();

        }

    }

);



async function getWeather() {


    const city =

    cityInput.value.trim();


    if (!city) {

        alert(

            "Please enter a city name"

        );

        return;

    }


    if (loader) {

        loader.style.display =

        "block";

    }


    results.classList.remove(

        "show"

    );


    try {


        // CURRENT WEATHER API

        const weatherURL =

        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


        const response =

        await fetch(weatherURL);


        if (!response.ok) {

            throw new Error(

                "City not found"

            );

        }


        const data =

        await response.json();


        console.log(data);



        // CURRENT WEATHER

        document.getElementById(

            "cityName"

        ).innerText =

        `${data.name}, ${data.sys.country}`;



        document.getElementById(

            "temperature"

        ).innerText =

        `${Math.round(data.main.temp)} °C`;



        document.getElementById(

            "description"

        ).innerText =

        data.weather[0].description;



        document.getElementById(

            "feelsLikeText"

        ).innerText =

        `Feels Like : ${Math.round(data.main.feels_like)} °C`;




        // DETAILS

        document.getElementById(

            "humidity"

        ).innerText =

        data.main.humidity + "%";



        document.getElementById(

            "wind"

        ).innerText =

        data.wind.speed + " m/s";



        document.getElementById(

            "pressure"

        ).innerText =

        data.main.pressure + " hPa";



        document.getElementById(

            "sea_level"

        ).innerText =

        data.main.sea_level || "N/A";



        document.getElementById(

            "longitude"

        ).innerText =

        data.coord.lon;



        document.getElementById(

            "latitude"

        ).innerText =

        data.coord.lat;




        // BACKGROUND IMAGE

        const weather =

        data.weather[0].description.toLowerCase();



        currentWeather.style.backgroundImage = "";

        currentWeather.style.backgroundSize = "cover";

        currentWeather.style.backgroundPosition = "center";

        currentWeather.style.backgroundRepeat = "no-repeat";



        if (weather.includes("cloud")) {

            currentWeather.style.backgroundImage =

            "url('./Images/broken_clouds.jpg')";

        }

        else if (weather.includes("clear")) {

            currentWeather.style.backgroundImage =

            "url('./Images/clear.avif')";

        }

        else if (weather.includes("rain")) {

            currentWeather.style.backgroundImage =

            "url('./Images/rain.jpg')";

        }

        else if (weather.includes("snow")) {

            currentWeather.style.backgroundImage =

            "url('./Images/snow.avif')";

        }

        else if (weather.includes("thunderstorm")) {

            currentWeather.style.backgroundImage =

            "url('./Images/thunder.avif')";

        }

        else if (

            weather.includes("mist") ||

            weather.includes("fog") ||

            weather.includes("haze")

        ) {

            currentWeather.style.backgroundImage =

            "url('./Images/fog.avif')";

        }

        else if (weather.includes("drizzle")) {

            currentWeather.style.backgroundImage =

            "url('./Images/drizzle.jpg')";

        }

        else if (weather.includes("smoke")) {

            currentWeather.style.backgroundImage =

            "url('./Images/smoke.avif')";

        }

        else if (

            weather.includes("dust") ||

            weather.includes("sand") ||

            weather.includes("ash")

        ) {

            currentWeather.style.backgroundImage =

            "url('./Images/dust.jpg')";

        }

        else if (

            weather.includes("squall") ||

            weather.includes("tornado")

        ) {

            currentWeather.style.backgroundImage =

            "url('./Images/squall.jpg')";

        }

        else if (weather.includes("hurricane")) {

            currentWeather.style.backgroundImage =

            "url('./Images/hurricane.jpg')";

        }

        else if (weather.includes("wind")) {

            currentWeather.style.backgroundImage =

            "url('./Images/windy1.jpg')";

        }

        else {

            currentWeather.style.background =

            "rgba(255,255,255,.3)";

        }




        // FORECAST API

        const forecastURL =

        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


        const forecastResponse =

        await fetch(forecastURL);


        if (!forecastResponse.ok) {

            throw new Error(

                "Forecast data not found"

            );

        }


        const forecastData =

        await forecastResponse.json();


        console.log(forecastData);




        // CLEAR OLD FORECAST

        forecastContainer.innerHTML = "";




        // GET 12 PM DATA

        const dailyForecast =

        forecastData.list.filter(

            item =>

            item.dt_txt.includes(

                "12:00:00"

            )

        );




        // DISPLAY 5 DAYS

        dailyForecast

        .slice(0, 5)

        .forEach((item, index) => {


            const date =

            new Date(item.dt_txt);


            const day =

            date.toLocaleDateString(

                "en-US",

                {

                    weekday: "short",

                    month: "short",

                    day: "numeric"

                }

            );



            const div =

            document.createElement(

                "div"

            );



            div.classList.add(

                "forecast-card"

            );



            div.style.animationDelay =

            `${index * 0.15}s`;



            div.innerHTML = `

                <h4>${day}</h4>

                <img
                src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

                <p>

                    ${Math.round(item.main.temp)} °C

                </p>

                <p>

                    ${item.weather[0].description}

                </p>

            `;



            forecastContainer.appendChild(

                div

            );

        });




        // SHOW RESULTS

        results.classList.add(

            "show"

        );

    }



    catch (error) {


        console.error(

            error

        );


        results.classList.remove(

            "show"

        );


        alert(

            error.message

        );

    }



    finally {


        if (loader) {

            loader.style.display =

            "none";

        }

    }

}