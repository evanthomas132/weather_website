import { useEffect, useState } from 'react';
import './index.css';

function App() {

  const [data, setData] = useState({})
  const [city, setCity] = useState('')


  const getWeather = async (e) => {
    if (e.key === 'Enter') {
      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_ID}`)
      const data = await api.json()
      setData(data)
      console.log(data)
    }
  }

  const getSearch = (e) => {
    setCity(e.target.value)
  }


  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div className="App">
      <div className='input'
        placeholder='Enter Location'
        onChange={getSearch}
        value={city}
        onKeyPress={getWeather}
      >
        <input type="text" className='search_bar'
          placeholder='Enter Location...' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <p>{data.main.temp} °C</p> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels_like">
            {data.main ? <p className='feels'>{data.main.feels_like} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='humid'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='wind_speed'>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
