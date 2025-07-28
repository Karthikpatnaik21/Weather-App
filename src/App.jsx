import { useState, useRef } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './context/index.jsx';
import { BackgroundLayout, WeatherCard, MiniCard } from './components';

function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const { weather, thisLocation, values, setPlace } = useStateContext();

  // Static array of city names
  const cityList = [
    'New York',
    'London',
    'Paris',
    'Tokyo',
    'Sydney',
    'Hyderabad',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'San Francisco',
    'Los Angeles',
    'Chicago',
    'Toronto',
    'Berlin',
    'Madrid',
    'Rome',
    'Moscow',
    'Beijing',
    'Seoul',
    'Singapore',
    'Dubai',
    'Cape Town',
    'Istanbul',
    'Bangkok',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Visakhapatnam',
    'Bhopal',
    'Patna',
    'Vadodara',
    'Ludhiana',
    'Agra',
    'Nashik',
    'Faridabad',
    'Meerut',
    'Rajkot',
    'Kalyan',
    'Vasai',
    'Varanasi',
    'Srinagar',
    'Aurangabad',
    'Dhanbad',
    'Amritsar',
    'Navi Mumbai',
    'Allahabad',
    'Ranchi',
    'Howrah',
    'Coimbatore',
    'Jabalpur',
    'Gwalior',
    'Vijayawada',
    'Jodhpur',
    'Madurai',
    'Raipur',
    'Kota',
    'Guwahati',
    'Chandigarh',
    'Solapur',
    'Hubli',
    'Mysore',
    'Tiruchirappalli',
    'Bareilly',
    'Aligarh',
    'Tiruppur',
    'Moradabad',
    'Jalandhar',
    'Bhubaneswar',
    'Salem',
    'Warangal',
    'Guntur',
    'Bhiwandi',
    'Saharanpur',
    'Gorakhpur',
    'Bikaner',
    'Amravati',
    'Noida',
    'Jamshedpur',
    'Bhilai',
    'Cuttack',
    'Firozabad',
    'Kochi',
    'Bhavnagar',
    'Dehradun',
    'Durgapur',
    'Asansol',
    'Nanded',
    'Kolhapur',
    'Ajmer',
    'Gulbarga',
    'Jamnagar',
    'Ujjain',
    'Loni',
    'Siliguri',
    'Jhansi',
    'Ulhasnagar',
    'Nellore',
    'Jammu',
    'Sangli',
    'Belgaum',
    'Mangalore',
    'Ambattur',
    'Tirunelveli',
    'Malegaon',
    'Gaya',
    'Udaipur',
    'Maheshtala',
    'Davanagere',
    'Kozhikode',
    'Kurnool',
    'Rajpur Sonarpur',
    'Bokaro',
    'South Dumdum',
    'Bellary',
    'Patiala',
    'Gopalpur',
    'Agartala',
    'Bhagalpur',
    'Muzaffarnagar',
    'Bhatpara',
    'Panihati',
    'Latur',
    'Dhule',
    'Rohtak',
    'Korba',
    'Bhilwara',
    'Brahmapur',
    'Muzaffarpur',
    'Ahmednagar',
    'Mathura',
    'Kollam',
    'Avadi',
    'Kadapa',
    'Anantapur',
    'Kamarhati',
    'Bilaspur',
    'Sambalpur',
    'Shahjahanpur',
    'Satara',
    'Bijapur',
    'Rampur',
    'Shivamogga',
    'Chandrapur',
    'Junagadh',
    'Thrissur',
    'Alwar',
    'Bardhaman',
    'Kulti',
    'Nizamabad',
    'Parbhani',
    'Tumkur',
    'Khammam',
    'Ozhukarai',
    'Bihar Sharif',
    'Panipat',
    'Darbhanga',
    'Bally',
    'Aizawl',
    'Dewas',
    'Ichalkaranji',
    'Karnal',
    'Bathinda',
    'Jalna',
    'Eluru',
    'Barasat',
    'Kirari Suleman Nagar',
    'Purnia',
    'Satna',
    'Mau',
    'Sonipat',
    'Farrukhabad',
    'Sagar',
    'Rourkela',
    'Durg',
    'Imphal',
    'Ratlam',
    'Hapur',
    'Arrah',
    'Karimnagar',
    'Anand',
    'Etawah',
    'Ambarnath',
    'North Dumdum',
    'Bharatpur',
    'Begusarai',
    'Port Blair',
    'Gandhinagar',
    'Shillong',
    'Sambhal',
    'Naihati',
    'Yamunanagar',
    'Bidhan Nagar',
    'Pallavaram',
    'Bidar',
    'Mira-Bhayandar',
    'Secunderabad',
    'Junagadh',
    'Thrissur',
    'Alwar',
    'Bardhaman',
    'Kulti',
    'Nizamabad',
    'Parbhani',
    'Tumkur',
    'Khammam',
    'Ozhukarai',
    'Bihar Sharif',
    'Panipat',
    'Darbhanga',
    'Bally',
    'Aizawl',
    'Dewas',
    'Ichalkaranji',
    'Karnal',
    'Bathinda',
    'Jalna',
    'Eluru',
    'Barasat',
    'Kirari Suleman Nagar',
    'Purnia',
    'Satna',
    'Mau',
    'Sonipat',
    'Farrukhabad',
    'Sagar',
    'Rourkela',
    'Durg',
    'Imphal',
    'Ratlam',
    'Hapur',
    'Arrah',
    'Karimnagar',
    'Anand',
    'Etawah',
    'Ambarnath',
    'North Dumdum',
    'Bharatpur',
    'Begusarai',
    'New Delhi',
    'Port Blair',
    'Gandhinagar',
    'Shillong',
    'Sambhal',
    'Naihati',
    'Yamunanagar',
    'Bidhan Nagar',
    'Pallavaram',
    'Bidar',
    'Mira-Bhayandar',
    'Secunderabad',
  ];

  // Filter cityList for suggestions
  const fetchSuggestions = (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const filtered = cityList.filter(city =>
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // limit to 8 suggestions
    setSuggestions(filtered);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    fetchSuggestions(val);
    setShowSuggestions(true);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setPlace(input);
      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setPlace(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  const handleBlur = (e) => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className="font-bold tracking-wide text-3xl">
          Weather App
        </h1>
        <div className='relative w-[18rem]'>
          <div className='flex items-center bg-white/90 shadow-2xl rounded-full px-3 py-2 gap-2 border-2 border-transparent focus-within:border-blue-400 transition-all duration-300'>
            <img src={search} alt='Search' className='h-[1.5rem] w-[1.5rem] opacity-70' />
            <input
              ref={suggestionsRef}
              onKeyUp={handleKeyUp}
              type='text'
              className='focus:outline-none bg-transparent pl-2 pr-3 py-1 w-full text-gray-800 placeholder-gray-500 text-lg rounded-full'
              placeholder='Search city...'
              value={input}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
              autoComplete='off'
              style={{ boxShadow: 'none' }}
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className='absolute z-10 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-56 overflow-y-auto text-gray-800'>
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className='px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-150'
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
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
