import React, { useEffect, useState } from 'react';
import search from '../services/getApiWeather';

export default function MainScreen() {
  const [city, setCity] = useState('');
  const [cityBkp, setCityBkp] = useState('');
  const [data, setData] = useState(undefined);
  const [btnlook, setBtnlook] = useState(true);
  const [units, setUnits] = useState('metric');
  const [error, setError] = useState(undefined);
  const [cf, setCf] = useState('°C');
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(undefined);

  const weather = async () => {
    const response = await search(cityBkp, units, 'pt_br');
    if (response.cod === '404') {
      setError(response.message);
      setCity('');
      setBtnlook(true);
    } else {
      setError(undefined);
      setData(response);
      setCity('');
    }
    const dt = new Date().toLocaleString();
    setDate(dt);
  };

  useEffect(() => {
    if (update) {
      weather();
    }
  }, [units]);

  const saveInput = ({ target }) => {
    const { value } = target;
    setCity(value);
    setCityBkp(value);
    setBtnlook(value.length < 3);
  };

  const btnUnits = () => {
    if (units === 'imperial') {
      setUnits('metric');
      setCf('°C');
      setUpdate(true);
    } else {
      setUnits('imperial');
      setCf('°F');
      setUpdate(true);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Weather</h1>
        <input
          type="text"
          value={city}
          name="city"
          onChange={saveInput}
          onKeyUp={(event) => event.key === 'Enter' && weather()}
          placeholder="Digite o nome da cidade"
        />

        <button
          type="button"
          disabled={btnlook}
          onClick={() => {
            btnUnits();
          }}
        >
          {cf}
        </button>
        {error ? <h5>{error}</h5>
          : data && (
            <>
              <p />
              {data.name}
              <h2>
                {data.main.temp}
                {cf}
              </h2>
              <p>
                {data.weather[0].description}
              </p>
              <p>{date}</p>
            </>
          )}
      </div>
    </div>
  );
}
