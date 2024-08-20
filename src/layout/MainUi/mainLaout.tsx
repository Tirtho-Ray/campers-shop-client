import { Outlet } from "react-router-dom";
import Navbar from "../../navber/Navbar";
import Footer from "../../footer/footer";
import ScrollManager from "../../UI/ScrollToTop";

const Main = () => {
  return (
    <div className=" lg:max-w-[1300px] mx-auto">
      <Navbar />
      <div>
      <ScrollManager>
        <Outlet />
      </ScrollManager>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
