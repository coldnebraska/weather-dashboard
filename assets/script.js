let searchButton = $(".search-btn")
let list = $(".search-history")
let history = []
let input = $("#city")[0].value

function getApi() {
  input = $("#city")[0].value
  let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=6cddf7d816b2147ea014ff6c5dd1dbeb&'

  fetch(requestUrl + new URLSearchParams({
    q: input
  }))
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      setCurrentWeather(data)
      setForecastWeather(data)
    });

    setSearchHistory(input)
  }

function searchApi(input) {
  let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=6cddf7d816b2147ea014ff6c5dd1dbeb&'

fetch(requestUrl + new URLSearchParams({
  q: input
}))
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    setCurrentWeather(data)
    setForecastWeather(data)
  });
}

function getSearchHistory() {
  history = JSON.parse(localStorage.getItem("searchHistory"))
  if (history != null) {
    for (i = 0; i < history.length; i++) {
      let createButton = $("<button>")
      createButton.text(history[i])
      createButton.attr("id", i)
      list.append(createButton)
    }
  } else {
    history = []
    localStorage.setItem("searchHistory", JSON.stringify(history))
  }
  let button = $("button[id]")
  button.on("click", searchHistoryButton)
}

function setSearchHistory(input) {
  // capitalize first letter of each word
  capitalize = input.split(" ")
  for (i = 0; i < capitalize.length; i++) {
    capitalize[i] = capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1)
    input = capitalize.join(" ")
  }

  if (history.includes(input)) {
    let index = history.indexOf(input)
    history.splice(index, 1) // deletes index of existing input
    history.splice(0, 0, input) // puts input at top of list

    for (i = 0; i < history.length; i++) {
      let cityButton = list.children().eq(i)
      cityButton.text(history[i])
    }
  } else {
    if (history.length < 10) {
      history.unshift(input)

      let createButton = $("<button>")
      createButton.text(input)
      list.append(createButton)
    } else {
      history.pop()
      history.unshift(input)

      for (i = 0; i < history.length; i++) {
        let cityButton = list.children().eq(i)
        cityButton.text(history[i])
      }
    }
    
  }

  localStorage.setItem("searchHistory", JSON.stringify(history))
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
    currentIcon.attr("class", "bi bi-sun-fill")
  } else if (data.list[0].weather[0].id > 800) { //cloudy
    currentIcon.attr("class", "bi bi-cloud-fill")
  } else if (data.list[0].weather[0].id < 800 && data.list[0].weather[0].id >= 700) { // haze/mist/fog/dust
    currentIcon.attr("class", "bi bi-cloud-haze")
  } else if (data.list[0].weather[0].id < 700 && data.list[0].weather[0].id >= 600) { // snow
    currentIcon.attr("class", "bi bi-snow")
  } else if (data.list[0].weather[0].id < 500 && data.list[0].weather[0].id >= 300) { // rain/drizzle
    currentIcon.attr("class", "bi bi-cloud-rain-heavy-fill")
  } else { // thunderstorm 500 - <600
    currentIcon.attr("class", "bi bi-cloud-lightning-fill")
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
      forecastIcon.attr("class", "bi bi-sun-fill")
    } else if (data.list[x].weather[0].id > 800) { //cloudy
      forecastIcon.attr("class", "bi bi-cloud-fill")
    } else if (data.list[x].weather[0].id < 800 && data.list[x].weather[0].id >= 700) { // haze/mist/fog/dust
      forecastIcon.attr("class", "bi bi-cloud-haze")
    } else if (data.list[x].weather[0].id < 700 && data.list[x].weather[0].id >= 600) { // snow
      forecastIcon.attr("class", "bi bi-snow")
    } else if (data.list[x].weather[0].id < 500 && data.list[x].weather[0].id >= 300) { // rain/drizzle
      forecastIcon.attr("class", "bi bi-cloud-rain-heavy-fill")
    } else { // thunderstorm 500 - <600
      forecastIcon.attr("class", "bi bi-cloud-lightning-fill")
    }

    x+= 8
  }
}

function searchHistoryButton() {
  let buttonContent = this.innerHTML
  searchApi(buttonContent)
}

getDate()
getSearchHistory()
searchButton.on("click", getApi)
