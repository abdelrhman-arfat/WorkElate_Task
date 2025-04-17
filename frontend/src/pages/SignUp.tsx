import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/AppDispatch";
import { setUser } from "../RTK/redux-slices/authSlice";
import { useUserSelector } from "../hooks/AppSelector";
import axiosInstance from "../util/AxiosSetting";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useUserSelector();
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
    const name = formData.get("name");
    const CPassword = formData.get("CPassword");
    if (CPassword !== password) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    toast
      .promise(
        axiosInstance.post(`/auth/signup`, {
          username: username?.toString().trim(),
          password: password?.toString().trim(),
          name: name?.toString().trim(),
          role: "user",
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
    <div className="min-h-screen flex items-center justify-center flex-col md:flex-row">
      {/* Form section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-rose-500 mb-6 text-center">
            Create Account 💗
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
            <input
              type="username"
              placeholder="Username"
              name="username"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="CPassword"
              className="p-3 border border-rose-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-md hover:from-pink-600 hover:to-rose-500 transition-all duration-300"
            >
              Sign Up
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?
              <Link to="/login" className="text-pink-500 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
