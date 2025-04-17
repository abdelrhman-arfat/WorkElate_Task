import { FaLink } from "react-icons/fa";
import { TBook } from "../../types/TBooks";
import { Link } from "react-router-dom";

const BookCard = ({ book }: { book: TBook }) => {
  return (
    <div className="w-full rounded-t-xl p-1  bg-gray-50 rounded-md hover:scale-[1.006] hover:rounded-t-sm duration-300  overflow-hidden shadow-sm  min-h-[250px]">
      <div className="min-w-full h-[240px] ">
        <img
          src={book.image}
          alt=""
          className="w-full h-full rounded-xl object-cover"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <div className="">
          <h4 className="text-[18px] line-clamp-1 tracking-wider font-bold">
            {book.title}
          </h4>
          <p className="text-sm text-gray-500  font-semibold">
            count : {book.count}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs line-clamp-3 min-h-[40px] text-gray-400/80">
            {book.description}
          </p>
        </div>
        <div>
          <Link
            to={`/books/${book._id}`}
            className="hover:text-blue-500 text-neutral-400 flex items-center gap-1.5"
          >
            view details <FaLink size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
