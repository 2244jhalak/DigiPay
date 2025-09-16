import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content grows to fill available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
