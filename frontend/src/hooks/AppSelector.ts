import { useSelector } from "react-redux";
import { RootState } from "../RTK/store";

const useUserSelector = () => {
  return useSelector((state: RootState) => state.auth);
};
const useSearchSelector = () => {
  return useSelector((state: RootState) => state.search);
};
export { useUserSelector, useSearchSelector };
