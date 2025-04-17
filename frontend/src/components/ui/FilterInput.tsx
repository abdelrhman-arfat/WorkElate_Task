import { useAppDispatch } from "../../hooks/AppDispatch";
import { setSearch } from "../../RTK/redux-slices/searchSlice";

const FilterInput = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2 bg-gray-50 p-2 shadow-md rounded-md">
      <h1 className="text-lg font-semibold text-rose-500">Filtering</h1>
      <div>
        <input
          onChange={(e) => dispatch(setSearch(e.target.value))}
          type="text"
          placeholder="Search for books..."
          className="w-full md:w-3/5  px-2 py-1 md:min-w-96 sm:px-4 sm:py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 shadow-sm transition duration-200"
        />
      </div>
    </div>
  );
};
export default FilterInput;
