import { useEffect, useState } from "react";
import { TBook } from "../../types/TBooks";
import axiosInstance from "../../util/AxiosSetting";

const BookDetailsCard = ({ id }: { id: string }) => {
  const [book, setBook] = useState<TBook | null>(null);
  useEffect(() => {
    const getBookData = async () => {
      try {
        const res = await axiosInstance.get(`/books/${id}`);
        setBook(res.data?.data.book);
      } catch (error) {
        console.error("Failed to fetch book data", error);
      }
    };

    getBookData();
  }, [id]);
  return (
    <div>
      {book ? (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-full sm:w-1/3 object-cover rounded-lg"
          />
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Count:</span> {book.count}
            </p>
            <p className="text-gray-700">{book.description}</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading book details...</div>
      )}
    </div>
  );
};

export default BookDetailsCard;
