import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-rose-50 text-rose-700 px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
