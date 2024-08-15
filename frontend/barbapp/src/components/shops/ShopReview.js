import StarRating from "../Star";

// Helper function to format the review date
const formatDate = (string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
};

const Review = ({ comment, rating, reviewerName, date }) => {
    const formattedDate = formatDate(date);

    return (
        <div key={crypto.randomUUID()} className="border-b py-4">
            <p className="text-gray-700">{comment}</p>
            <div className="flex items-center">
                <StarRating rating={rating} />
                <p className="ml-2 text-sm text-gray-500">- {reviewerName}</p>
                <p className="ml-2 text-sm text-gray-500">- {formattedDate}</p>
            </div>
        </div>
    );
};

const Reviews = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="mt-4">
                {reviews?.length ? (
                    reviews.map((review) => (
                        <Review key={crypto.randomUUID()} {...review} />
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
