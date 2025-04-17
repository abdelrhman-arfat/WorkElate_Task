import { useDispatch } from "react-redux";
import { AppDispatch } from "../RTK/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
