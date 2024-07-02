import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './context/index.jsx';
import { BackgroundLayout, WeatherCard, MiniCard } from './components';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, setPlace } = useStateContext();

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setPlace(input);
      setInput(''); // Clear input after search
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 class="font-bold tracking-wide text-3xl">
          <span class="text-red-500">W</span>
          <span class="text-orange-500">e</span>
          <span class="text-yellow-500">a</span>
          <span class="text-green-500">t</span>
          <span class="text-blue-500">h</span>
          <span class="text-indigo-500">e</span>
          <span class="text-purple-500">r</span>
          <span class="text-pink-500"> </span>
          <span class="text-red-500">A</span>
          <span class="text-orange-500">p</span>
          <span class="text-yellow-500">p</span>
        </h1>
        <div className='bg-transparent w-[15rem] overflow-hidden shadow-2xl rounded-full flex items-center p-2 gap-2'>
          <div className='relative flex items-center'>
            <img src={search} alt='Search' className='absolute left-3 h-[1.5rem] w-[1.5rem] pointer-events-none' />
            <input
              onKeyUp={handleKeyUp}
              type='text'
              className='focus:outline-none border-2 border-gray-300 rounded-full pl-10 pr-3 py-2 w-full text-gray-700 placeholder-gray-500 text-lg bg-transparent transition-all duration-300'
              placeholder='Search...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.border = '2px solid #4ea8de'; // Light blue outline on focus
                e.target.style.borderRadius = '10px';
              }}
              onBlur={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.border = '2px solid transparent';
                e.target.style.borderRadius = 'none';
              }}
            />
          </div>
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wind?.speed}
          humidity={weather.main?.humidity}
          temperature={weather.main?.temp}
          heatIndex={weather.main?.feels_like}
          iconString={weather.weather?.[0]?.main}
          conditions={weather.weather?.[0]?.description}
        />
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values.map((curr) => (
            <MiniCard
              key={curr.dt}
              time={curr.dt_txt}
              temp={curr.main.temp}
              iconString={curr.weather[0].main}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
