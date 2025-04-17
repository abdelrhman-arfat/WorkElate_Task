const BookCardSkeleton = () => {
  return (
    <div className="w-full rounded-t-xl hover:scale-[1.008] hover:rounded-t-sm duration-300 overflow-hidden shadow-md min-h-[250px]">
      <div className="h-[170px] w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />

      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

        <div className="h-3 w-1/3 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

        <div className="h-[35px] w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

        <div className="h-8 w-24 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse self-start" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
