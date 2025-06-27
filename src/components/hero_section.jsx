import projector from '../media/projector-background.jpg';
const HeroSection = () => (
    <div className="bg-white">
    <div className="relative">
        <div className="mx-auto max-w-7xl">
            <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
                >
                    <polygon points="0,0 90,0 50,100 0,100"/>
                </svg>

                <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                        <div className="hidden sm:mb-10 sm:flex">
                            <div
                                className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                 For Film Reviews, and News from Fort Kent Cinema!{' '}
                                <a href="#" className="font-semibold whitespace-nowrap text-indigo-600">
                                    <span aria-hidden="true" className="absolute inset-0"/>
                                    Read Our Blog <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">Fort Kent Cinema
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Located in the heart of downtown Fort Kent, our cozy two-screen theater combines modern technology with a welcoming atmosphere, perfect for enjoying the latest blockbusters, family favorites, and indie gems. <br/><br/>Join
                            us and experience the magic of cinema!
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a
                                href="#now-playing"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Now Playing
                            </a>
                            <a href="/coming-soon" className="text-sm/6 font-semibold text-gray-900">
                                Coming Soon <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
                alt="Old fashion film projector"
                src={projector}
                className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
            />
        </div>
    </div>
</div>
);

export default HeroSection;