function searchWheather(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=4354bae4bc4f80de34b0ce15453d2200", 
        method: "GET",
        
    })
    .then (function(response) {
        var displayCity = $("#displayCity")
        var displayTemp = $("#displayTemp")
        var displayHumidity = $("#displayHumidity")
        var displayWind = $("#displayWind")
        var displayUV = $("#displayUV")

        displayCity.text(response.name)
        displayTemp.text("The temperature is"+response.main.temp)
        displayHumidity.text(response.name)



        console.log(response)
        console.log(response.name)
        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        console.log()
    })
}




$("#searchButton").on("click", function(e) {
    e.preventDefault()
    console.log("this works")
    var cityName = $("#searchCity").val()
    console.log(cityName)
    searchWheather(cityName);
})
