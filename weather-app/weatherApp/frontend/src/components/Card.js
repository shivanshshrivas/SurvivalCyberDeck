export default function Card () {
    return (
        <div>
            <div className="card bg-[#ffffff70] backdrop-blur-xl border border-[#d9d9d9] shadow-custom-dark mt-10 rounded-lg w-[540px] p-5">
                <div className="card-header flex justify-start w-full">
                    <h1 className="card-title font-poppins text-3xl">Card Title</h1>
                </div>
                <div className="card-body flex flex-col items-center justify-start">
                    <div>
                        
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