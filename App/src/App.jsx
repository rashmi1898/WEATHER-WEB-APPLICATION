
import { useEffect, useState } from 'react';
import Highlights from './components/Highlights';
import Temprature from './components/temprature';
import './App.css';
function App() {
  const [city, setCity] = useState("Bhubaneswar");
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Add state for dark mode

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=5de5a57884334b2fb18165056242908&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div id='screen' className={darkMode ? 'dark' : 'light'}>
      <div className={`h-screen flex justify-center align-top ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#292929] text-black'}`}>
        <div className='mt-10 absolute right-5'>
          <button
            onClick={toggleDarkMode}
            className='bg-[black] text-white py-2 px-4 rounded'
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className='mt-40 w-1/5 h-1/3'>
          <div></div>
          {weatherData && <Temprature
            setCity={setCity}
            stats={{
              temp: weatherData?.current.temp_c,
              condition: weatherData?.current.condition.text,
              isday: weatherData?.current.is_day,
              location: weatherData?.location.name,
              localtime: weatherData?.location.localtime
            }}
          />}
        </div>
        <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
          <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
          {weatherData && (
            <>
              <Highlights
                stats={{
                  title: "Wind Status",
                  value: weatherData.current.wind_mph,
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: "Humidity",
                  value: weatherData.current.humidity,
                  unit: "%",
                }}
              />
              <Highlights
                stats={{
                  title: "Visibility",
                  value: weatherData.current.vis_miles,
                  unit: "miles",
                }}
              />
              <Highlights
                stats={{
                  title: "Air pressure",
                  value: weatherData.current.pressure_mb,
                  unit: "mb",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;









 