import axios from 'axios';

const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f8ed450d168c479009e2c10d039c9128';

export const fetchWeather = async(cityName) => {
   try { 
    const { data } = await axios.get(weatherAPI + `q=${cityName}&units=metric&appid=${apiKey}`);
    return data;
   }
   catch(error) {
    throw error;
   }
}