import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context/index.jsx';

import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.weather?.[0]?.description) {
      const imageString = weather.weather?.[0]?.description.toLowerCase();

      if (imageString.includes('clear')) {
        setImage(Clear);
      } else if (imageString.includes('clouds')) {
        setImage(Cloudy);
      } else if (imageString.includes('rain') || imageString.includes('shower')) {
        setImage(Rainy);
      } else if (imageString.includes('snow')) {
        setImage(Snow);
      } else if (imageString.includes('fog')) {
        setImage(Fog);
      } else if (imageString.includes('thunder') || imageString.includes('storm')) {
        setImage(Stormy);
      }
    }
  }, [weather.weather?.[0]?.description]);

  return (
    <img src={image} alt="Weather Image" className="h-screen w-full fixed left-0 top-0 z-[-10]" />
  );
}

export default BackgroundLayout;
