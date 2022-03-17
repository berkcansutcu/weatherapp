const apiUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "59e8a7cfef41a5cb264bc7e49c07186a";


function takeData(city="adana") {
    let query = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
    fetch(query)
        .then(weather => weather.json())
        .then(datas => {
            if(datas.cod>=400){
                alert(`${datas.cod} : ${datas.message}`)
            }
            else{
                let baslik = document.getElementById("weather-title");
            baslik.innerHTML = datas.name + " Hava Durumu (" + datas.sys.country + ")";

            let icon = document.getElementById("icon");
            icon.src = `http://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`;

            let degree = document.getElementById("degree")
            degree.innerHTML = Math.round(datas.main.temp) + "°C"

            let description = document.getElementById("description")
            description.innerHTML = datas.weather[0].description

            let feels = document.getElementById("feels")
            feels.innerHTML = "Hissedilen : " + Math.round(datas.main.feels_like) + "°C"

            let hum = document.getElementById("humidity")
            hum.innerHTML = "Nem Oranı : " + Math.round(datas.main.humidity) + "%";

            let wind = document.getElementById("wind")
            wind.innerHTML = "Rüzgar Hızı : " + Math.round(datas.wind.speed) + " KM/S";

            let cloud = document.getElementById("cloud")
            cloud.innerHTML = "Bulut Oranı : " + datas.clouds.all + "%";

            let minmax = document.getElementById("minmax")
            minmax.innerHTML = `Min/Max : ${Math.round(datas.main.temp_min)}°C
     / ${Math.round(datas.main.temp_max)}°C `
            } 

        })
}

let search = document.getElementById("search")
search.addEventListener("click", (e) => {

    let cityname = document.getElementById("cityname").value
    takeData(cityname);
    document.getElementById("cityname").value =""
    e.preventDefault();
})

 let pressEnter = document.getElementById("cityname")
 pressEnter.addEventListener("keypress",(e) => {
     if(e.keyCode == 13){
         takeData(pressEnter.value)

         pressEnter.value=""
         e.preventDefault();
     }

     
 })


let capitals = document.addEventListener("click",(e) => {
    capitalName = e.target.getAttribute('id')
    if(capitalName != null && e.target.parentElement.getAttribute('id')=="capitals"){
       takeData(capitalName)
    }
})

takeData();
