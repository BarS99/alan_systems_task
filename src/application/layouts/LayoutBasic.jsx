import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutBasic = () => {
  return (
    <div className="d-flex flex-column w-100 min-vh-100 justify-content-between">
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutBasic;
