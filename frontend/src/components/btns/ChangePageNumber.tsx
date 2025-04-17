const ChangePageNumber = ({
  setPage,
  page,
  totalPages,
  refetch,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
  refetch: () => void;
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-4 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page > 1 ? page - 1 : page);
          refetch();
        }}
        className={`px-6 py-2 rounded-lg text-white font-medium transition duration-300 
          ${
            page <= 1
              ? "bg-rose-200 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
          }`}
      >
        Previous
      </button>
      <button
        disabled={page >= totalPages}
        onClick={() => {
          setPage(page < totalPages ? page + 1 : page);
          refetch();
        }}
        className={`px-6 py-2 rounded-lg text-white font-medium transition duration-300 
          ${
            page >= totalPages
              ? "bg-rose-200 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default ChangePageNumber;
