import { useCallback, useEffect } from "react";
import axiosInstance from "./AxiosSetting";
import { useAppDispatch } from "../hooks/AppDispatch";
import { logout, setUser } from "../RTK/redux-slices/authSlice";
import { useUserSelector } from "../hooks/AppSelector";

const RefreshTokenHelper = () => {
  const dispatch = useAppDispatch();
  const user = useUserSelector();
  const sendRefreshToken = useCallback(async () => {
    const res = await axiosInstance.post(
      `/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) {
      dispatch(logout());
      return;
    }
    dispatch(setUser(res.data.data));
  }, [dispatch]);
  useEffect(() => {
    sendRefreshToken();
    let intervalId: ReturnType<typeof setInterval>;
    if (user.isAuthenticated) {
      sendRefreshToken();
      intervalId = setInterval(sendRefreshToken, 1000 * 60 * 10);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [sendRefreshToken, user.isAuthenticated]);
  return null;
};

export default RefreshTokenHelper;
