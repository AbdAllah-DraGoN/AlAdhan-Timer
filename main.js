let cityselect = document.getElementById("cities");

let cities = [
  {
    arName: "القاهرة",
    cityName: "Cairo",
    countryName: "EG",
  },
  {
    arName: "القدس",
    cityName: "Al Quds",
    countryName: "PS",
  },
  {
    arName: "مكة المكرمة",
    cityName: "makkah al mukarramah",
    countryName: "SA",
  },
];
// Add Cities Options In Select
for (city of cities) {
  cityselect.innerHTML += `
  <option>${city.arName}</option>`;
}

getPlayerTimesOfCity(cities[0].cityName, cities[0].countryName);

// for Chane City
cityselect.addEventListener("change", function () {
  let citycode = "";
  let countrycode = "";
  for (city of cities) {
    if (city.arName == this.value) {
      citycode = city.cityName;
      countrycode = city.countryName;
      document.getElementById("city").innerHTML = city.arName;
    }
  }
  getPlayerTimesOfCity(citycode, countrycode);
});

function getPlayerTimesOfCity(cityName, countryName) {
  let params = {
    city: cityName,
    country: countryName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      // console.log(response);
      let date = response.data.data.date;
      document.getElementById(
        "date"
      ).innerHTML = `${date.hijri.weekday.ar}  -  ${date.readable}`;
      let timings = response.data.data.timings;
      setAdhanTime(timings);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setAdhanTime(timings) {
  document.querySelector("#Fajr").innerHTML = timings.Fajr;
  document.querySelector("#Sunrise").innerHTML = timings.Sunrise;
  document.querySelector("#Dhuhr").innerHTML = timings.Dhuhr;
  document.querySelector("#Asr").innerHTML = timings.Asr;
  document.querySelector("#Maghrib").innerHTML = timings.Maghrib;
  document.querySelector("#Isha").innerHTML = timings.Isha;
}
