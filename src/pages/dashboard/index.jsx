import Sidebar from "@/components/Layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { ALL_BANNER } from "@/pages/api/banner";
import { handleDataBannerRedux } from "@/store/bannerSlice";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { IsOpenContext } from "@/contexts/isOpen";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isOpen } = useContext(IsOpenContext);
  const { user } = useContext(UserContext);

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ALL_BANNER}`, config)
      .then((res) => {
        dispatch(handleDataBannerRedux(res.data.data));
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataBanner();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins text-slate-800 ease-linear duration-300`}
      >
        <h1 className="text-3xl font-medium text-center font-casser md:text-5xl">
          Welcome Back, {user.name}
        </h1>
        <p className="mt-2 text-center md:text-lg">Have a nice day! 😉</p>
        <img
          src="images/dashboard.png"
          alt="dashboard image"
          className="object-cover w-[500px]"
        />
      </main>
    </div>
  );
};

export default Dashboard;
