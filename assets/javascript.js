function searchWheather(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4354bae4bc4f80de34b0ce15453d2200",

        method: "GET",

        // url: ,
        // method: "GET",
    })
        .then(function (response) {
            let displayCity = $("#displayCity")
            let displayTemp = $("#displayTemp")
            let displayHumidity = $("#displayHumidity")
            let displayWind = $("#displayWind")
            let retrievedTemp = response.main.temp
            let adjustedTemp = ((retrievedTemp - 273.15) * 9 / 5 + 32)
            let coord1 = (response.coord.lon)
            let coord2 = (response.coord.lat)
            let location = [coord1, coord2]
            const todaysDate = moment().format("M" + "/" + "D" + "/" + "YYYY");
            // $("#displayCity").append(todaysDate);

            displayCity.text(response.name + ", ").append(todaysDate);
            displayTemp.text("The temperature is: " + Math.trunc(adjustedTemp) + "°F");
            displayHumidity.text("Humidity: " + response.main.humidity + "%");
            displayWind.text("Wind speed: " + response.wind.speed + " mph");

            // console.log(response)
            // console.log(response.name)
            // console.log(response.main.temp)
            // console.log(response.main.humidity)
            // console.log(response.wind.speed)
            // console.log(location)

            getUV(coord1, coord2)
        })
}


function searchForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6d488e833fc2d8238e17e4d9e7dd8667",
        method: "GET",
    })

        .then(function (response2) {
            let displayForecast = $("#displayForecast")
            let firstTemp = ((response2.list[2].main.temp - 273.15) * 9 / 5 + 32);
            let secondTemp = ((response2.list[10].main.temp - 273.15) * 9 / 5 + 32);
            let thirdTemp = ((response2.list[18].main.temp - 273.15) * 9 / 5 + 32);
            let fourthTemp = ((response2.list[26].main.temp - 273.15) * 9 / 5 + 32);
            let fifthTemp = ((response2.list[34].main.temp - 273.15) * 9 / 5 + 32);

            let humidOne = response.list[2].main.humidity
            let humididTwo = response.list[10].main.humidity
            let humidThree = response.list[18].main.humidity
            let humidFour = response.list[26].main.humidity
            let humidFive = response.list[34].main.humidity
        
           
            let emojiOne = $("#emoji-1")
            let emojiTwo = $("#emoji-2")
            let emojiThree = $("#emoji-3")
            let emojiFour = $("#emoji-4")
            let emojiFive = $("#emoji-5")

            let tempOne = $("#temp1")
            let tempTwo = $("#temp2")
            let tempThree = $("#temp3")
            let tempFour = $("#temp4")
            let tempFive = $("#temp5")

            let humidityOne = $("#humidity1")
            let humidityTwo = $("#humidity2")
            let humidityThree = $("#humidity3") 
            let humidityFour = $("#humidity4") 
            let humidityFive = $("#humidity5") 

            tempOne.text("Temperature: " + Math.trunc(firstTemp) + "°F")
            tempTwo.text("Temperature: " + Math.trunc(secondTemp) + "°F")
            tempThree.text("Temperature: " + Math.trunc(thirdTemp) + "°F")
            tempFour.text("Temperature: " + Math.trunc(fourthTemp) + "°F")
            tempFive.text("Temperature: " + Math.trunc(fifthTemp) + "°F")

            humidityOne.text("Humidity level: " + humidOne)
            humidityTwo.text("Humidity level: " + humidTwo)
            humidityThree.text("Humidity level: " + humidThree)
            humidityFour.text("Humidity level: " + humidFour)
            humidityFive.text("Humidity level: " + humidFive)

            console.log(response2.list[2].main.humidity)
            console.log(response2.list[2].main.temp)
            console.log(firstTemp + "test")
            console.log(secondTemp + "test")
            console.log(thirdTemp + "test")
            console.log(fourthTemp + "test")
            console.log(fifthTemp + "test")
            console.log(response2)
        })
}

function getUV(coord1, coord2) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + coord1 + "&lon=" + coord2 + "&appid=edbd8869685693227fe9f341c0e16b4a",
        method: "GET",
    })

        .then(function (response) {
            let displayUV = $("#displayUV")
            displayUV.text("UV Index: " + response.value)
            console.log(response);

        })

}

$("#searchButton").on("click", function (e) {
    e.preventDefault();
    console.log("this works");
    var cityName = $("#searchCity").val();
    console.log(cityName);
    searchWheather(cityName);
    searchForecast(cityName);
    save(cityName)
})


function save(newCity) {
    var cityArray = JSON.parse(localStorage.getItem("cityHistory")) || [];
    cityArray.push(newCity);
    localStorage.setItem("cityHistory", JSON.stringify(cityArray))
}

function renderSearchHistory() {
    let cityArray = JSON.parse(localStorage.getItem("cityHistory")) || [];
    cityArray.forEach(element => {
        console.log(element);
        let button = $("<button>");
        button.text(element);
        button.addClass("btn btn-primary btn-block mb-2 search-historyBtn")
        $("#citylist").append(button);

    });
}

// 

renderSearchHistory()

$(".search-historyBtn").on("click", function (e) {
    e.preventDefault();
    let btnText = $(this).text();
    console.log(btnText);
    searchWheather(btnText);
    searchForecast(btnText);
})

$("#clearButton").on("click", function(clear) {
        storage.removeItem(".search-historyBtn")
    })