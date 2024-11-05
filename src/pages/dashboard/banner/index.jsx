import { API_KEY } from "@/pages/api/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/pages/api/config";
import { ALL_BANNER } from "@/pages/api/banner";
import Link from "next/link";
import { DELETE_BANNER } from "@/pages/api/banner";

const Banner = () => {
  const [dataBanner, setDataBanner] = useState([]);

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ALL_BANNER}`, config)
      .then((res) => setDataBanner(res.data.data))
      .catch((err) => console.log(err.response));
  };

  const deleteBanner = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_BANNER + id}`, config)
      .then((res) => alert("Delete Success"))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataBanner();
  });

  return (
    <div>
      <Link href="/dashboard/banner/create-banner">
        <button>Create</button>
      </Link>
      {dataBanner.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 aspect-square"
          />
          <p>{item.name}</p>
          <Link href={`/dashboard/banner/${item.id}`}>
            <button>Detail</button>
          </Link>
          <button onClick={() => deleteBanner(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Banner;
