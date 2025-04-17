import { Link } from "react-router-dom";
import CardLooper from "./CardLooper";
import { useGetBooksQuery } from "../../RTK/RTK-query/RTKQuery";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import Error from "../ui/Error";

const FeaturedBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery({
    limit: 4,
    page: 1,
    search: "",
    startsWith: "",
  });
  const getBooks = (): React.ReactElement[] => {
    if (Array.isArray(data?.data)) {
      return data?.data.map((book) => (
        <BookCard key={book._id + "book-card-home"} book={book} />
      ));
    }
    return [];
  };
  return (
    <section className="flex flex-col gap-3 my-3 justify-between ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold sm:text-2xl sm:font-bold">
          Featured Books
        </h1>
        <Link
          to={"/books"}
          className="text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md bg-gradient-to-r from-pink-500 to-rose-500"
        >
          All Books
        </Link>
      </div>

      <div>
        {isLoading ? (
          <CardLooper>
            {Array.from({ length: 4 }).map((_, index) => (
              <BookCardSkeleton key={index + "book-card-skeleton"} />
            ))}
          </CardLooper>
        ) : isError ? (
          <Error />
        ) : data?.data.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-semibold">No books found</h1>
          </div>
        ) : (
          <CardLooper>{getBooks()}</CardLooper>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
