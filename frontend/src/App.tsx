import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="w-full min-h-screen  px-6 sm:px-14 md:px-16 xl:px-20">
      <NavBar />
      <main className="py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
