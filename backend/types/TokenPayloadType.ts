type TTokenPayload = {
  _id: string;
  username: string;
  name: string;
  image: string;
  role: "admin" | "user";
};

export { TTokenPayload };
