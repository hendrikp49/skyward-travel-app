import Sidebar from "@/components/Layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { ALL_BANNER } from "@/pages/api/banner";
import { handleDataBannerRedux } from "@/store/bannerSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dataBanner } = useSelector((state) => state.banner);

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

  console.log(dataBanner);

  useEffect(() => {
    handleDataBanner();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex items-center justify-center w-full h-screen bg-slate-800">
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
