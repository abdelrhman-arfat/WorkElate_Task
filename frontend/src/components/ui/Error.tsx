import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm space-y-4">
      <AiOutlineExclamationCircle className="text-red-600 w-12 h-12" />
      <p className="text-center text-red-700 text-lg font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
