const ShopInfo = ({ title, description }) => {
    return (
        <div className="mt-4">
            <h1 className="text-3xl font-bold">{title || "Shop Name"}</h1>
            <p className="mt-2 text-gray-700">{description}</p>
        </div>
    );
};

export default ShopInfo;
