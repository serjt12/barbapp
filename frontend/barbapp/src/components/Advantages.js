import product1 from "../assets/products1.jpg";
import product2 from "../assets/products2.jpg";
import product3 from "../assets/products3.jpg";

const Advantages = () => {
    return (
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 bg-white shadow rounded m-3">
            <h2 className="text-2xl font-bold text-gray-900 m-2">Services</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 m-2">
                <div className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                            src={product1}
                            alt="haircut service"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="/">
                            <span className="absolute inset-0"></span>
                            Explore Local Beauty Shops
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                        Find everything close to you
                    </p>
                </div>
                <div className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                            src={product2}
                            alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="/">
                            <span className="absolute inset-0"></span>
                            Beauty shops
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                        Discover Quality Beauty Products
                    </p>
                </div>
                <div className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                            src={product3}
                            alt="Collection of four insulated travel bottles on wooden shelf."
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="/">
                            <span className="absolute inset-0"></span>
                            Connect with Independent Hairdressers
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                        Personalized Service at Your Fingertips
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Advantages;
