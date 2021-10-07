import { useState } from 'react'
import { getCity, getWeather } from './Functions';


function Body() {
const [city, setCity] = useState('') 
const [cityDetails, setCityDetails] = useState({})


const updateCity = async (city) => {
    console.log(city)
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
   const newDetails = {...city}
    setCityDetails({...cityDetails, newDetails})
    return { cityDets, weather  }
}






const cityForm = (e) => {
    e.preventDefault();
    setCity('');
    updateCity(city)
    .then(data => setCityDetails(data))
    .catch(err => console.log(err));    
}   

    return (
        <div>
            <form onSubmit={cityForm}>
                <label htmlFor="city">
                    Enter a location for weather information
                </label>
                <input type="text" name="city" value={city}
                 onChange={(e) => setCity(e.target.value)}
                 autoComplete="off"/>
            </form>
            
          
           
               
               {cityDetails.weather && <div className="card">
                <img src={cityDetails?.weather?.IsDayTime ? '/img/day.svg' : '/img/night.svg'} className="time" alt="" />
                <div className="icon">
                    <img src={`/img/icons/${cityDetails?.weather?.WeatherIcon}.svg`} alt="" /> 
                    <img src="" alt="" />
                </div>
                <div className="detail">
               
                    <h5 className="city-name">{cityDetails?.cityDets?.EnglishName}</h5>
                    <div className="weather-condition">{cityDetails?.weather?.WeatherText}</div>
                    <div className="temp">
                        <span>{cityDetails?.weather?.Temperature?.Metric?.Value}&deg;C</span>
                        <span className="degree"></span>
                    </div>
                </div>

             </div>}
               
        </div>
    )
}

export default Body
 