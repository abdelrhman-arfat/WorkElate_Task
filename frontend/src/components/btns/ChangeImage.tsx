import { TUser } from "../../types/UserType";
import { FaPen } from "react-icons/fa";
import { useRef } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../util/AxiosSetting";
import { useAppDispatch } from "../../hooks/AppDispatch";
import { setUser } from "../../RTK/redux-slices/authSlice";

const ChangeImage = ({ user }: { user: TUser }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      toast
        .promise(
          axiosInstance.put(`/users/${user._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Changing profile image...",
            success: (res) => {
              return res.data.message || "Image updated successfully";
            },
            error: (err) =>
              err.response?.data?.message || "Failed to update image",
          }
        )
        .then((res) => {
          dispatch(setUser(res.data.data));
        });
    }
  };

  const avatarContent = user?.image ? (
    <img
      src={user.image}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-rose-500 flex items-center justify-center text-white text-3xl font-bold">
      {user?.name?.[0]?.toUpperCase()}
    </div>
  );

  return (
    <div className="relative w-24 h-24 group cursor-pointer">
      {avatarContent}
      <div
        onClick={handleImageClick}
        className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <FaPen className="text-white text-lg" />
      </div>
      <input
        type="file"
        ref={inputRef}
        name="image"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ChangeImage;
