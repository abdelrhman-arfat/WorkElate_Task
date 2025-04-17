import ChangeImage from "../components/btns/ChangeImage";
import ChangeName from "../components/btns/ChangeName";
import ChangePassword from "../components/btns/ChangePassword";
import { useUserSelector } from "../hooks/AppSelector";

const Profile = () => {
  const { user } = useUserSelector();

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 text-center space-y-4">
      <div className="flex gap-5 items-center">
        <ChangeImage user={user} />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <h2 className="text-sm text-gray-400">@{user.username}</h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <ChangeName id={user._id} />
        <ChangePassword id={user._id} />
      </div>
    </div>
  );
};

export default Profile;
