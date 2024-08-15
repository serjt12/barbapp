const ShopImage = ({ src, alt }) => {
    return (
        <div className="md:w-32 lg:w-48 xl:w-96">
            <img
                src={src || "https://via.placeholder.com/600x400"}
                alt={alt}
                className="object-cover w-full h-full"
            />
        </div>
    );
};

export default ShopImage;
