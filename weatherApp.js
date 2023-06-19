const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')


const API_LINK ='https://api.openweathermap.org/data/2.5/weather?q='

const API_KEY = '&appid=061126680762623bf0baf8991717c9c2'
const API_UNITS = '&units=metric'

const getWeather = () => {
    const city = input.value || "London" ;
    const URL = API_LINK + city + API_KEY + API_UNITS;

    axios.get(URL).then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = res.data.weather[0];
        const icon = status.id;
        console.log(icon);


        cityName.textContent = res.data.name;
        temperature.textContent = temp.toFixed(0) + '*C';
        humidity.textContent = hum.toFixed(0) + '%'
        weather.textContent = status.main;

        warning.textContent = "";
        input.value="";

        if(icon<300) {
            photo.setAttribute('src','./img/thunderstorm.png');
        } else if (icon<400) {
            photo.setAttribute('src','./img/drizzle.png');
        } else if (icon<600) {
            photo.setAttribute('src','./img/rain.png');
        } else if (icon<700) {
            photo.setAttribute('src','./img/snow.png');
        } else if (icon<800) {
            photo.setAttribute('src','./img/fog.png');
        } else if (icon==800) {
            photo.setAttribute('src','./img/sun.png');
        } else if (icon<900) {
            photo.setAttribute('src','./img/cloud.png');
        } else {
            photo.setAttribute('src','./img/unknown.png');
        }
    }).catch(()=> warning.textContent = " Wpisz poprawna nazwę miasta...");
}

const EnterCheck = (e) => {
    if (e.key === 'Enter') {
        getWeather()
    }
}
input.addEventListener('keyup',EnterCheck)

button.addEventListener('click',getWeather)