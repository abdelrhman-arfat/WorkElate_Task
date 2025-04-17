import { useState, useRef, useEffect } from "react";
import { TUser } from "../../types/UserType";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import LogoutButton from "../btns/LogoutButton";

const UserCard = ({ user }: { user: TUser }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstLetter = user.name?.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={cardRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-[50px] h-[50px] rounded-full overflow-hidden bg-rose-500 text-white flex items-center justify-center text-xl font-bold shadow-md"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          firstLetter
        )}
      </button>

      {open && (
        <div className="absolute left-0 -translate-x-1/2  sm:right-3 mt-5 sm:mt-3 w-64 flex flex-col gap-4 bg-white rounded-2xl shadow-xl p-4 z-10">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {firstLetter}
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-lg font-semibold">{user.name}</span>
              <span className="text-sm text-gray-600">@{user.username}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="text-gray-600 bg-gray-100 rounded-md text-[16px] hover:text-white hover:bg-neutral-800 duration-200 px-4 py-2"
            >
              <IoMdSettings />
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm bg-gray-100 rounded-md text-[16px] text-gray-600 hover:text-white hover:bg-neutral-800 duration-200 px-4 py-2"
              >
                Admin
              </Link>
            )}
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
