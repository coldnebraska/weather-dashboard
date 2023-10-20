let currentIcon = $("#current-weather-icon")
let day1Icon = $("#day1-icon")
let day2Icon = $("#day2-icon")
let day3Icon = $("#day3-icon")
let day4Icon = $("#day4-icon")
let day5Icon = $("#day5-icon")
let selectedCity = $(".city")
let currentTemp = $("#current-temp")
let currentWind = $("#current-wind")
let currentHumidity = $("#current-humidity")

function getApi() {
  let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=London&appid=6cddf7d816b2147ea014ff6c5dd1dbeb'
// {city} {key}
  requestUrl.replace("city", "Austin")
  requestUrl.replace("key", "6cddf7d816b2147ea014ff6c5dd1dbeb")
  console.log (requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)

      console.log(data.city.name)
      console.log(Math.floor(data.list[0].main.temp * 9 / 5 - 459.67)) // changes the default of K to F
      console.log(data.list[0].main.humidity)
      console.log(data.list[0].weather[0].id)
      console.log(data.list[0].wind.speed)

      setCurrentWeather(data)
      // setForecastWeather(data)
    });
  }

  function setCurrentWeather(data) {
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

  // TODO: Loop through the data and generate your HTML
  // for (i = 0; i < data.length; i++) {
  //   let userLogin = document.createElement("h3")
  //   let userUrl = document.createElement("p")
  //   userLogin.textContent = data[i].login
  //   userUrl.textContent = data[i].html_url
  //   userContainer.append(userLogin)
  //   userContainer.append(userUrl)
  // }

function getDate() {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = month + "/" + day + "/" + year
  let curDate = $("#current-date")
  curDate.text(currentDate)
}

function setIcons() {
  
  day1Icon.addClass("bi bi-sun-fill")
  day2Icon.addClass("bi bi-sun-fill")
  day3Icon.addClass("bi bi-sun-fill")
  day4Icon.addClass("bi bi-sun-fill")
  day5Icon.addClass("bi bi-sun-fill")
}

getDate()
setIcons()
getApi()
