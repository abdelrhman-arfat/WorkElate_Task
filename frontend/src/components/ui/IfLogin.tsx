import { Link } from "react-router-dom";
import UserCard from "../card/UserCard";
import { TUser } from "../../types/UserType";

const IfLogin = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: TUser;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      {/* will be handled when add auth logic and redux states */}
      <Link to="/">home</Link>
      <Link to={"/books"}>books</Link>
      {isAuthenticated ? (
        <UserCard user={user} />
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </div>
  );
};

export default IfLogin;
