import React from "react";
import { useAppDispatch } from "../../hooks/AppDispatch";
import {
  deleteStartsWith,
  setStartsWith,
} from "../../RTK/redux-slices/searchSlice";

interface LetterLoopingProps {
  selected?: string;
}

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const LetterLooping: React.FC<LetterLoopingProps> = ({ selected }) => {
  const dispatch = useAppDispatch();
  return (
    <nav className="flex overflow-x-auto space-x-2 py-2 px-4 sm:justify-center sm:flex-wrap bg-white rounded-xl shadow-sm">
      {letters.map((letter) => {
        const isActive = selected === letter;
        return (
          <button
            key={letter}
            aria-pressed={isActive}
            className={
              `flex-shrink-0 w-10 h-10 m-2 flex items-center justify-center rounded-full text-sm font-medium transition-colors ` +
              (isActive
                ? "bg-rose-500 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-rose-100")
            }
            onClick={() => {
              if (isActive) {
                dispatch(deleteStartsWith());
              } else {
                dispatch(setStartsWith(letter));
              }
            }}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
};

export default LetterLooping;
