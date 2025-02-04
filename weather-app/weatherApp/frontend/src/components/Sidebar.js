
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
        <div className="flex items-center justify-start h-full mr-2">
            <div 
                className={`sidebar text-white px-2 pt-4 flex flex-col items-start justify-start h-full`}   
                >
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
                    <svg fill="#333" width="25px" height="25px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
                        <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.828.124a5.09 5.09 0 1 0-8.688 3.599.396.396 0 0 0 .56-.56 4.298 4.298 0 1 1 6.078 0 .396.396 0 1 0 .56.56 5.056 5.056 0 0 0 1.49-3.599zm-2.992 2.097a2.966 2.966 0 1 0-4.194 0 .396.396 0 1 0 .56-.56 2.174 2.174 0 1 1 3.074 0 .396.396 0 0 0 .56.56zm-.661 2.8a.396.396 0 0 0-.396-.396h-.644v-3.55a1.03 1.03 0 1 0-.792 0v3.55H7.46a.396.396 0 1 0 0 .792h2.08a.396.396 0 0 0 .396-.396z"/>
                    </svg>      
                </div>
                <div className={`wifi flex items-center justify-start duration-300 ease-in-out border border-transparent rounded-lg p-3 mb-4 overflow-hidden cursor-pointer`}
                    onMouseEnter={() => {handleMouseEnter('wifi')}}
                    onMouseLeave={() => {handleMouseLeave('wifi')}} >
                    <svg fill="#333" width="25px" height="25px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
                        <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM14.3 8.2a.396.396 0 0 0 0-.56 8.196 8.196 0 0 0-11.6 0 .396.396 0 1 0 .56.56 7.405 7.405 0 0 1 10.48 0 .396.396 0 0 0 .56 0zm-1.738 1.18a5.74 5.74 0 0 0-8.123-.001.396.396 0 0 0 .56.56 4.952 4.952 0 0 1 7.003 0 .396.396 0 0 0 .56-.56zm-1.74 1.738a3.285 3.285 0 0 0-4.645 0 .396.396 0 0 0 .56.56 2.493 2.493 0 0 1 3.526 0 .396.396 0 0 0 .56-.56zM9.63 13.481a1.123 1.123 0 1 0-1.123 1.123A1.123 1.123 0 0 0 9.63 13.48z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}