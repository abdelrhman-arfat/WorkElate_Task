import { FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import IfLogin from "../ui/IfLogin";
import { TUser } from "../../types/UserType";

const MobileMenu = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: TUser;
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sm:hidden relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-2xl p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
      >
        <FaBars />
      </button>

      {open && (
        <div className="absolute  right-2 top-14 w-48 bg-white shadow-xl rounded-xl p-4 z-50 animate-fade-in">
          <IfLogin isAuthenticated={isAuthenticated} user={user} />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
