// function getApi() {
//     var requestUrl = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}';
  
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         // Use the console to examine the response
//         console.log(data);
//         // TODO: Loop through the data and generate your HTML
//         for (i = 0; i < data.length; i++) {
//           let userLogin = document.createElement("h3")
//           let userUrl = document.createElement("p")
//           userLogin.textContent = data[i].login
//           userUrl.textContent = data[i].html_url
//           userContainer.append(userLogin)
//           userContainer.append(userUrl)
//         }
//       });
//   }
//   fetchButton.addEventListener('click', getApi);

function getDate() {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = month + "/" + day + "/" + year

}

function setIcons() {
  let currentIcon = $("#current-weather-icon")
  let day1Icon = $("#day1-icon")
  let day2Icon = $("#day2-icon")
  let day3Icon = $("#day3-icon")
  let day4Icon = $("#day4-icon")
  let day5Icon = $("#day5-icon")
  
  currentIcon.addClass("bi bi-sun-fill")
  day1Icon.addClass("bi bi-sun-fill")
  day2Icon.addClass("bi bi-sun-fill")
  day3Icon.addClass("bi bi-sun-fill")
  day4Icon.addClass("bi bi-sun-fill")
  day5Icon.addClass("bi bi-sun-fill")
}

getDate()
setIcons()
