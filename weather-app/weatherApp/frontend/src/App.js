import './App.css';
import TemperatureCard from './components/TemperatureCard';
import AirPressureCard from './components/AirPressureCard';
import HumidityCard from './components/HumidityCard';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App flex justify-start items-start h-screen">
      <Sidebar />
      <div className="content grid grid-cols-5 gap-y-0">
        <div className="col-span-3">
          <TemperatureCard />
        </div>
        <div className="col-span-2">
          <HumidityCard />
          <AirPressureCard />
        </div>
      </div>
    </div>
  );
}

export default App;