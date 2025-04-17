import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/AppDispatch";
import { useUserSelector } from "../hooks/AppSelector";
import { setUser } from "../RTK/redux-slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../util/AxiosSetting";
const Login = () => {
  const dispatch = useAppDispatch();
  const user = useUserSelector();
  const navigate = useNavigate();
  if (user.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">you are login all ready</h1>
        <p className="text-red-500">logout first and try again</p>
        <Link to="/" className="text-blue-500 underline">
          go to home
        </Link>
      </div>
    );
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    toast
      .promise(
        axiosInstance.post(`/auth/login`, {
          username: username?.toString().trim(),
          password: password?.toString().trim(),
        }),
        {
          loading: "Logging in...",
          success: (res) => {
            return res.data.message || "Logged in successfully";
          },
          error: (err) => {
            return err.response.data.message || "Failed to login";
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
        navigate("/");
        return;
      });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-rose-500 mb-6 text-center">
            Welcome Back 💖
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              name="username"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              name="password"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-md hover:from-pink-600 hover:to-rose-500 transition-all duration-300"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-pink-500 underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
