import { useParams } from "react-router-dom";
import BookDetailsCard from "../components/card/BookDetailsCard";
import Error from "../components/ui/Error";
import BookReview from "../components/ui/BookReview";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Error />;
  }

  return (
    <div className="w-full mx-auto p-6 space-y-10 md:space-y-0 xl:flex md:space-x-6">
      <div className="xl:w-2/3 bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <BookDetailsCard id={id as string} />
      </div>

      <div className="xl:w-1/3 bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
        <h3 className="text-2xl  font-bold text-rose-600">Comments</h3>
        <BookReview id={id} />
      </div>
    </div>
  );
};

export default BookDetails;
