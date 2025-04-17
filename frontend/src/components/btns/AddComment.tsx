import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../util/AxiosSetting";

const AddComment = ({
  id,
  onCommentAdded,
}: {
  id: string;
  onCommentAdded: () => void;
}) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("The comment review can't be empty");
      return;
    }

    toast
      .promise(
        axiosInstance.post(`/reviews`, {
          bookId: id,
          comment,
        }),
        {
          loading: "Adding post",
          success: (res) => res.data.message || "created successfully",
          error: (err) =>
            err.response.data.message ||
            "Created comment error if try login if not",
        }
      )
      .then(() => {
        onCommentAdded();
      });

    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
    >
      <div className="flex-1">
        <textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={1}
          className="w-full resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400 transition text-sm"
        ></textarea>

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-rose-600 transition disabled:opacity-50"
            disabled={!comment.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
