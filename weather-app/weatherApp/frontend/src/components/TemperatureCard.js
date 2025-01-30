import weathericon from '../assets/weather.png'

export default function Card () {
    return (
        <div>
            <div className="card bg-[#ffffff70] backdrop-blur-xl border border-[#d9d9d9] shadow-custom-dark mt-10 rounded-lg min-w-[300px] m-2 p-5">
                <div className="card-header flex justify-start w-full">
                    <h1 className="card-title font-poppins text-2xl">Temperature</h1>
                </div>
                <div className="card-body flex flex-col items-center justify-start">
                    <div className = {'weather-details flex flex-row justify-start w-full'}>
                        <img src={weathericon} alt="weather-icon" className="w-1/2 h-1/2"/>
                        <div className="weather-info flex flex-col items-start justify-center">
                            <h1 className="font-poppins text-5xl">
                                16°C
                            </h1>
                            <p className = 'font-poppins text-2xl'>
                                Partly Cloudy
                            </p>
                        </div>
                    </div>
                    <p className="card-text font-roboto text-md text-left">
                        This card is meant to be used for
                        displaying information in a structured
                        way. It can be used to display data for
                        weather.
                    </p>
                </div>
            </div>
        </div>
    )
}