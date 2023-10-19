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

  console.log(currentDate)
}

getDate()
