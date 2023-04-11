import React from 'react';
import axios from 'axios';
import {useState} from 'react';

function App() {

  const [weather, setWeather] = useState({});
  const [input, setInput] = useState('');

  const dataURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=7d4aaaf1b7628d5b1ee06d5b0c2a9891
  `;


  const getWeather = (e) =>{
    if(e.key == 'Enter'){
      axios.get(dataURL).then((response) => {
        setWeather(response.data);
      })
      .catch(err => console.log(err));
      setInput('');
    }
  }

  return (
    <div className="App">
      <div className = "search">
        <input
          type = "text"
          onChange = {(e) => setInput(e.target.value)}
          value = {input}
          placeholder = "Input Your Location"
          onKeyDown = {(e) => getWeather(e)}
        />
      </div>
      <div className = "AppContainer">
        <div className = "location">
          <h1>{weather.name} {weather.sys? weather.sys.country: null}</h1>
          {weather.main? <h1>{Math.round(weather.main.temp)} °C</h1> : null}
          {weather.weather? <p>{weather.weather[0].description.charAt(0).toUpperCase()+weather.weather[0].description.substr(1)}</p> : null}
        </div>
        <div className = "detail">
          <div className = "feels">
            {weather.main? <h2>Feels like</h2> : null}
            {weather.main? <p>{Math.round(weather.main.feels_like)} °C</p> : null}
          </div>
          <div className = "humidity">
            {weather.main? <h2>Humidity</h2> : null}
            {weather.main? <p>{weather.main.humidity} %</p> : null}
          </div>
          <div className = "wind">
            {weather.wind? <h2>Wind Speed</h2> : null}
            {weather.wind? <p>{weather.wind.speed} km/h</p> : null}
          </div>
          <div className = "Pressure">
            {weather.main? <h2>Pressure</h2> : null}
            {weather.main? <p>{weather.main.pressure} kPA</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
