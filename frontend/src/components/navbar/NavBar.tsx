import { Link } from "react-router-dom";
import IfLogin from "../ui/IfLogin";
import { useUserSelector } from "../../hooks/AppSelector";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const { user, isAuthenticated } = useUserSelector();
  return (
    <header className="flex h-[100px]  items-center justify-between">
      <Link to="/" className="text-2xl font-bold">
        Logo
      </Link>
      <div className="hidden sm:block">
        <IfLogin isAuthenticated={isAuthenticated} user={user} />
      </div>
      <div className="sm:hidden">
        <MobileMenu isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  );
};

export default NavBar;
