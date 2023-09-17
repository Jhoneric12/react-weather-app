import React from 'react'
import { useState, useEffect} from 'react'
import {GoSearch} from 'react-icons/go'
// import Cloudy from '../assets/cloudy.png'
import { fetchWeather } from '../services/weatherAPI';


function Weather() {

    const [weather, getWeather] = useState({});
    const [city, setCity] = useState("");
    const [hasResult, setResult] = useState(true);

    const getData = async(e) => {
        try {
            if(e.key === 'Enter') {
                e.preventDefault();
                const data = await fetchWeather(city);
                getWeather(data);
                // console.log(data);
            }
        }
        catch(error) {
            console.log(error.message);
            // alert("Invalid City");
            setResult(false);
        }

    
    }
    useEffect(() => {
        getData();
      }, []);


  return (
    <div className='flex justify-center text-center items-center h-screen'>
        <div className='weather-container flex flex-col items-center justify-center  w-[80%] h-[35rem] rounded-[30px] bg-[rgba(255,255,255,0.2)] md:w-[40%] md:flex md:items-center'>
            <div className='flex items-center flex-col justify-center w-full'>
                {hasResult ? <h1 className='text-[red] mb-4'>Invalid City! Try Again</h1> : null}
                <div className='flex items-center' >
                    <input 
                    value={city}
                    type="text"
                    className='py-[0.875rem] px-[2rem] rounded-[40px] mr-3 w-full'
                    placeholder='Search City' 
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={getData}
                    required/>
                    <GoSearch className='text-white w-[1.5rem] h-[1.5rem]'/>
                </div>
            </div>

            {typeof weather.main !== 'undefined' ? 
            <>
                <div className="city">
                    <h1 className='font-regular text-white mt-10 mb-4 text-2xl'>{weather.name}</h1>
                </div>
                <div className="city">
                    <h1 className='font-semibold text-white mb-4 text-1xl'>{weather.sys.country}</h1>
                </div>
                <div className="temp">
                    <h1 className='text-white font-extrabold text-6xl'>{parseFloat(weather.main.temp)}&deg;C</h1>
                </div>
                <div className="weather-icon">
                    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" className='w-[8rem] h-[8rem] mt-5'/>
                </div>
                <div className="weather-stats">
                    <h1 className='text-2xl font-bold text-white mt-3'>{weather.weather[0].main}</h1>
                </div>
            </> : null}
            
        </div>
    </div>
  )
}

export default Weather