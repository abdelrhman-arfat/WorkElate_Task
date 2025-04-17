import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../util/AxiosSetting";
import AddComment from "../btns/AddComment";

const BookReview = ({ id }: { id: string }) => {
  const [review, setReview] = useState<[]>();
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/reviews/${id}`);
      setReview(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div>
      <AddComment id={id} onCommentAdded={fetchReviews} />
      <div className="max-h-[400px] overflow-y-auto">
        {Array.isArray(review) &&
          review?.map(
            (comment: {
              userId: {
                name: string;
                image: string;
              };
              comment: string;
              _id: string;
            }) => (
              <div
                key={comment._id + "comment"}
                className="flex my-5 items-start gap-3 border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0"
              >
                <div>
                  {comment.userId.image ? (
                    <img
                      src={comment.userId.image}
                      alt={comment.userId.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                      {comment.userId.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {comment.userId.name}
                  </p>
                  <p className="text-gray-600 text-sm">{comment.comment}</p>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default BookReview;
