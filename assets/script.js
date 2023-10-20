function getApi() {
  let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=6cddf7d816b2147ea014ff6c5dd1dbeb'
  // {city} {key}
  requestUrl.replace("city", "Austin")
  requestUrl.replace("key", "6cddf7d816b2147ea014ff6c5dd1dbeb")
  // console.log (requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)

      setCurrentWeather(data)
      setForecastWeather(data)
    });
}

function setCurrentWeather(data) {
  let selectedCity = $(".city")
  let currentIcon = $("#current-weather-icon")
  let currentTemp = $("#current-temp")
  let currentWind = $("#current-wind")
  let currentHumidity = $("#current-humidity")
  
  selectedCity.text(data.city.name)
  currentTemp.text(Math.floor(data.list[0].main.temp * 9 / 5 - 459.67))
  currentWind.text(data.list[0].wind.speed)
  currentHumidity.text(data.list[0].main.humidity)

  if (data.list[0].weather[0].id === 800) { // clear
    currentIcon.addClass("bi bi-sun-fill")
  } else if (data.list[0].weather[0].id > 800) { //cloudy
    currentIcon.addClass("bi bi-cloud-fill")
  } else if (data.list[0].weather[0].id < 800 && data.list[0].weather[0].id >= 700) { // haze/mist/fog/dust
    currentIcon.addClass("bi bi-cloud-haze")
  } else if (data.list[0].weather[0].id < 700 && data.list[0].weather[0].id >= 600) { // snow
    currentIcon.addClass("bi bi-snow")
  } else if (data.list[0].weather[0].id < 500 && data.list[0].weather[0].id >= 300) { // rain/drizzle
    currentIcon.addClass("bi bi-cloud-rain-heavy-fill")
  } else { // thunderstorm
    currentIcon.addClass("bi bi-cloud-lightning-fill")
  }
}

function setForecastWeather(data) {
  let x = 7

  for (i = 1; i <= 5; i++) {
    let forecastTemp = $(".forecast").children().eq(i - 1).children().eq(2).children()
    forecastTemp.text(Math.floor(data.list[x].main.temp * 9 / 5 - 459.67))

    let forecastWind = $(".forecast").children().eq(i - 1).children().eq(3).children()
    forecastWind.text(data.list[x].wind.speed)

    let forecastHumidity = $(".forecast").children().eq(i - 1).children().eq(4).children()
    forecastHumidity.text(data.list[x].main.humidity)

    x += 8
  }

  setForecastIcons(data)
}

function getDate() {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = month + "/" + day + "/" + year
  let curDate = $("#current-date")
  
  curDate.text(currentDate)

  let forecastDate = $(".forecast").children().children("h3")

  for (i = 0; i < 5; i++) {
    forecastDate.eq([i]).text(month + "/" + (day + i + 1) + "/" + year)
  }
}

function setForecastIcons(data) {
  let x = 7

  for (i = 0; i < 5; i++) {
    let forecastIcon = $(".forecast").children().children("i").eq(i)

    if (data.list[x].weather[0].id === 800) { // clear
      forecastIcon.addClass("bi bi-sun-fill")
    } else if (data.list[x].weather[0].id > 800) { //cloudy
      forecastIcon.addClass("bi bi-cloud-fill")
    } else if (data.list[x].weather[0].id < 800 && data.list[x].weather[0].id >= 700) { // haze/mist/fog/dust
      forecastIcon.addClass("bi bi-cloud-haze")
    } else if (data.list[x].weather[0].id < 700 && data.list[x].weather[0].id >= 600) { // snow
      forecastIcon.addClass("bi bi-snow")
    } else if (data.list[x].weather[0].id < 500 && data.list[x].weather[0].id >= 300) { // rain/drizzle
      forecastIcon.addClass("bi bi-cloud-rain-heavy-fill")
    } else { // thunderstorm
      forecastIcon.addClass("bi bi-cloud-lightning-fill")
    }

    x+= 8
  }
}

getDate()
getApi()
