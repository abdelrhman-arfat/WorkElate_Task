import { Provider } from "react-redux";
import store from "../store";
import RefreshTokenHelper from "../../util/RefreshTokenHelper";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <RefreshTokenHelper />
      {children}
    </Provider>
  );
};

export default AppProvider;
