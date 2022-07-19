import { useState } from 'react';
import MainScreen from '../components/MainScreen';
import ScreenDetails from '../components/ScreenDetails';

export default function Home() {
  const [data, setData] = useState(undefined);
  const funcdata = (resp, cf) => {
    setData({
      data: resp,
      cf,
    });
  };
  return (
    <div>
      <MainScreen func={funcdata} />
      <ScreenDetails info={data} />
    </div>
  );
}
