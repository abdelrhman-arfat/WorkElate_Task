import { useState } from "react";
import ChangePageNumber from "../components/btns/ChangePageNumber";
import CardLooper from "../components/card/CardLooper";
import BookCard from "../components/card/BookCard";
import FilterInput from "../components/ui/FilterInput";
import { useGetBooksQuery } from "../RTK/RTK-query/RTKQuery";
import BookCardSkeleton from "../components/card/BookCardSkeleton";
import Error from "../components/ui/Error";
import { useSearchSelector } from "../hooks/AppSelector";
import LetterLooping from "../components/ui/LetterLooping";

const Book = () => {
  const search = useSearchSelector();

  const totalPages = 10;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, refetch } = useGetBooksQuery({
    page,
    limit: 12,
    search: search.search.toString().trim() ?? "",
    startsWith: search.startsWith.toString().trim() ?? "",
  });

  if (isError) return <Error onRetry={() => refetch()} />;

  const functionToGetBooks = (): React.ReactElement[] => {
    if (Array.isArray(data?.data)) {
      return data.data.map((book, i) => <BookCard book={book} key={i} />);
    }
    return [];
  };

  return (
    <>
      <section>
        <ChangePageNumber
          refetch={refetch}
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages || 0}
        />
      </section>

      <section className="mx-2 my-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Page : {page}</span>
        <span className="text-sm text-gray-500 ">
          Total Pages : {totalPages}
        </span>
      </section>

      <section className=" my-4">
        <div className="mb-6">
          <FilterInput />
          <LetterLooping selected={search.startsWith} />
        </div>
        {data?.totalBooks && data?.totalBooks > 0 && (
          <div className="my-4">
            <h1>Total Books: {data?.totalBooks}</h1>
          </div>
        )}
        {isLoading ? (
          <CardLooper>
            {Array.from({ length: 12 }).map((_, index) => (
              <BookCardSkeleton key={index + "-card-skelton"} />
            ))}
          </CardLooper>
        ) : isError ? (
          <Error />
        ) : data?.data.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-semibold">No books found</h1>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-semibold">No books found</h1>
          </div>
        ) : (
          <CardLooper>{functionToGetBooks()}</CardLooper>
        )}
      </section>
    </>
  );
};

export default Book;
