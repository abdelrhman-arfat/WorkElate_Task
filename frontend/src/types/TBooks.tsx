import { TResponse } from "./Response";

type TBook = {
  _id: string;
  title: string;
  description: string;
  image: string;
  count: number;
};
type TBooks = TResponse<TBook[]>;

export type { TBooks, TBook };
