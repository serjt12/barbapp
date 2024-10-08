import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/utils";

const ShopActions = ({ shopType, thumbnailsImages }) => {
    return (
        <div className="mt-8">
            {shopType === "beauty_shop" || shopType === "independent" ? (
                <div>
                    <h2 className="text-2xl font-semibold">
                        Book an Appointment
                    </h2>
                    <div className="flex space-x-2 mt-4">
                        {thumbnailsImages
                            ?.slice(0, 3)
                            .map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(thumbnail)}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                    </div>
                    <Link
                        to="bookings"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded inline-block"
                    >
                        Book now!
                    </Link>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold">Our Products</h2>
                    <div className="flex space-x-2 mt-4">
                        {thumbnailsImages
                            ?.slice(0, 5)
                            .map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(thumbnail)}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                    </div>
                    <Link
                        to="products"
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded inline-block"
                    >
                        View Products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ShopActions;
