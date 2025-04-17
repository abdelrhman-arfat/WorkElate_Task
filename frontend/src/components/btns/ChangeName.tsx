import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../util/AxiosSetting";
import { setUser } from "../../RTK/redux-slices/authSlice";
import { useAppDispatch } from "../../hooks/AppDispatch";

const ChangeName = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Please enter a new name");
      return;
    }
    toast
      .promise(
        axiosInstance.put(`/users/${id}`, {
          name: newName,
        }),
        {
          loading: "change name",
          success: (res) => res.data.message || "name changed successfully",
          error: (err) => err.response.data.message || "failed change name",
        }
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
      });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
      >
        Change Name
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-rose-500"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 text-rose-600">
              Change Your Name
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your new name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md transition"
              >
                Save Name
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeName;
