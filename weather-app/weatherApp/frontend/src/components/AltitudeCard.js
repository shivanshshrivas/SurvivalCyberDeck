import weathericon from '../assets/altitude.png'

export default function Card () {
    return (
        <div className = 'flex flex-1'>
            <div className="card bg-[#e8e8e865] backdrop-blur-xl border border-[#d9d9d9] shadow-custom-dark rounded-lg h-[50] m-[5px] p-5">
                <div className="card-header flex justify-start w-full">
                    <h1 className="card-title font-poppins text-2xl">Altitude</h1>
                </div>
                <div className="card-body flex flex-col items-center justify-stretch">
                    <div className = {'weather-details flex flex-row justify-start w-full'}>
                        <img src={weathericon} alt="weather-icon" className="w-1/2 h-1/2"/>
                        <div className="weather-info flex flex-col items-start justify-center">
                            <h1 className="font-poppins text-5xl">
                                140 m
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}