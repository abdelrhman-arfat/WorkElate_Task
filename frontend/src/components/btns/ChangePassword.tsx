import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../util/AxiosSetting";

const ChangePassword = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    toast.promise(
      axiosInstance.patch(`/users/change-password/${id}`, {
        newPassword,
        oldPassword,
      }),
      {
        loading: "changing password",
        success: (res) => res.data.message || "password changed success full",
        error: (err) =>
          err.response.data.message || "failed to changes password",
      }
    );

    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition"
        onClick={() => setIsOpen(true)}
      >
        Change Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-rose-600">
              Change Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                name="oldPassword"
                type="password"
                placeholder="Old password"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-rose-500 outline-none text-sm"
              />
              <input
                type="password"
                required
                name="newPassword"
                placeholder="New password"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-rose-500 outline-none text-sm"
              />
              <input
                type="password"
                required
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-rose-500 outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition"
              >
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
