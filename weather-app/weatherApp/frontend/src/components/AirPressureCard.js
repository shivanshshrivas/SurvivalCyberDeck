import weathericon from '../assets/wind.png'

export default function Card () {
    return (
        <div className = 'flex flex-1 flex-col'>
            <div className="card bg-[#ffffff80] backdrop-blur-xl border border-[#d9d9d9] shadow-custom-dark rounded-lg m-[5px] p-5">
                <div className="card-header flex justify-start w-full">
                    <h1 className="card-title font-poppins text-2xl">Air Pressure</h1>
                </div>
                <div className="card-body flex flex-col items-center justify-start">
                    <div className = {'weather-details flex flex-row justify-start w-full'}>
                        <img src={weathericon} alt="weather-icon" className="w-1/3"/>
                        <div className="weather-info flex flex-col items-start justify-center">
                            <h1 className="font-poppins text-5xl">
                                991 hPa
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}