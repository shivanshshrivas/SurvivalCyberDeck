
export default function Sidebar () {

    function handleMouseEnter(ClassName) {
        const component = document.querySelector(`.${ClassName}`);
        if (component) {
            component.classList.add('bg-[#e8e8e865]');
            component.classList.add('shadow-custom-dark');
            component.classList.remove('border-transparent');
            component.classList.add('border-[#d9d9d9]');
            
        }
    }
    function handleMouseLeave(ClassName) {
        const component = document.querySelector(`.${ClassName}`);
        if (component) {
            component.classList.remove('bg-[#e8e8e865]');
            component.classList.remove('shadow-custom-dark');
            component.classList.add('border-transparent');
            component.classList.remove('border-[#d9d9d9]');
        }
    }

    return (
        <div className="flex items-center justify-start h-full mx-[2px]">
            <div 
                className={`sidebar text-white px-2 pt-4 flex flex-col items-center justify-between h-full`}   
                >
                <div className="">
                    <div className={`home flex items-center justify-start duration-300 ease-in-out border border-transparent rounded-lg p-3 mb-4 overflow-hidden cursor-pointer`}
                        onMouseEnter={() => {handleMouseEnter('home')}}
                        onMouseLeave={() => {handleMouseLeave('home')}} >
                        <svg width="25px" height="25px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z" fill="#333"/>
                        </svg>
                    </div>
                    <div className={`radio flex items-center justify-start duration-300 ease-in-out border border-transparent rounded-lg p-3 mb-4 overflow-hidden cursor-pointer`}
                        onMouseEnter={() => {handleMouseEnter('radio')}}
                        onMouseLeave={() => {handleMouseLeave('radio')}} >
                        <svg fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Antenna_1"> <path d="M407.652,160.958c-12.399,8.454-17.03,24.534-11.026,38.289c-51.442,43.079-102.882,86.156-154.324,129.234 c-55.099-55.099-110.199-110.199-165.297-165.297c-102.672,102.672-102.672,269.139,0,371.811s269.139,102.672,371.811,0 c-55.099-55.099-110.199-110.199-165.297-165.297c43.079-51.442,86.156-102.882,129.234-154.324 c13.754,6.003,29.833,1.373,38.289-11.026c8.454-12.399,6.893-29.059-3.718-39.67C436.71,154.067,420.05,152.504,407.652,160.958z "></path> <path d="M425.243,99.918c0,6.245,0,12.49,0,18.735c37.612,0,68.103,30.491,68.103,68.103c6.245,0,12.49,0,18.735,0 C512.081,138.797,473.202,99.918,425.243,99.918z"></path> <path d="M425.243,49.959c0,6.245,0,12.49,0,18.735c65.204,0,118.062,52.858,118.062,118.062c6.245,0,12.49,0,18.735,0 C562.041,111.205,500.794,49.959,425.243,49.959z"></path> <path d="M425.243,0c0,6.245,0,12.49,0,18.735c92.795,0,168.022,75.226,168.022,168.021c6.245,0,12.49,0,18.735,0 C612,83.614,528.385,0,425.243,0z"></path> </g> </g> </g></svg>                </div>
                    <div className={`wifi flex items-center justify-start duration-300 ease-in-out border border-transparent rounded-lg p-3 mb-4 overflow-hidden cursor-pointer`}
                        onMouseEnter={() => {handleMouseEnter('wifi')}}
                        onMouseLeave={() => {handleMouseLeave('wifi')}} >
                        <svg fill="#333" width="25px" height="25px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
                            <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM14.3 8.2a.396.396 0 0 0 0-.56 8.196 8.196 0 0 0-11.6 0 .396.396 0 1 0 .56.56 7.405 7.405 0 0 1 10.48 0 .396.396 0 0 0 .56 0zm-1.738 1.18a5.74 5.74 0 0 0-8.123-.001.396.396 0 0 0 .56.56 4.952 4.952 0 0 1 7.003 0 .396.396 0 0 0 .56-.56zm-1.74 1.738a3.285 3.285 0 0 0-4.645 0 .396.396 0 0 0 .56.56 2.493 2.493 0 0 1 3.526 0 .396.396 0 0 0 .56-.56zM9.63 13.481a1.123 1.123 0 1 0-1.123 1.123A1.123 1.123 0 0 0 9.63 13.48z"/>
                        </svg>
                    </div>
                </div>
                <div>
                    helo
                </div>
            </div>
        </div>
    );
}