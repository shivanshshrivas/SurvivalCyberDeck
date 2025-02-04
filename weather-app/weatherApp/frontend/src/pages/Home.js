import TemperatureCard from '../components/TemperatureCard';
import AirPressureCard from '../components/AirPressureCard';
import HumidityCard from '../components/HumidityCard';
import AltitudeCard from '../components/AltitudeCard';
import globe from '../assets/globe.png';

export default function Home() {
  return (
    <div className="flex h-screen">
        
      <div className="flex flex-col justify-start items-center border-l-2 border-l-[#d9d9d9] pl-2 h-full overflow-y-auto">
        <div className="flex flex-row justify-start items-end w-4/5 px-2 ">
            <img src={globe} className="w-[25px] h-[25px]" alt="globe" />
            <p className="mx-2 mt-5 font-poppins text-xl">
                Lawrence, KS
            </p>
            </div>
        <div className="content grid grid-cols-5 gap-x-0 gap-y-0 w-4/5 ">
          <div className="col-span-3 flex flex-col flex-1 h-full">
            <TemperatureCard />
            <AirPressureCard />
          </div>
          <div className="col-span-2 flex flex-col h-full">
            <HumidityCard />
            <AltitudeCard />
          </div>
        </div>
      </div>
    </div>
  );
}