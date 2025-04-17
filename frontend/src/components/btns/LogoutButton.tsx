import { useAppDispatch } from "../../hooks/AppDispatch";
import { logout } from "../../RTK/redux-slices/authSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../util/AxiosSetting";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        toast
          .promise(axiosInstance.post("/auth/logout"), {
            loading: "Logging out...",
            success: (res) => res.data.message || "Logged out successfully",
            error: (err) => err.response.data.message || "Failed to logout",
          })
          .then(() => {
            dispatch(logout());
          });
      }}
      className="text-white bg-rose-500 px-3 py-1.5 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
