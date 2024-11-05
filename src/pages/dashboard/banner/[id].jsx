import { BANNER_ID, UPDATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailBanner = () => {
  const router = useRouter();
  const [dataBanner, setDataBanner] = useState({
    name: "",
    imageUrl: "",
  });

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + BANNER_ID + router.query.id}`, config)
      .then((res) => setDataBanner(res.data.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setDataBanner({
      ...dataBanner,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      name: dataBanner.name,
      imageUrl: dataBanner.imageUrl,
    };

    axios
      .post(`${BASE_URL + UPDATE_BANNER + router.query.id}`, payload, config)
      .then((res) => {
        alert("Update Success");
        setTimeout(() => {
          router.push("/dashboard/banner");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataBanner();
    }
  }, [router.query.id]);

  return (
    <div>
      <img
        src={dataBanner.imageUrl}
        alt={dataBanner.name}
        className="w-24 aspect-square"
      />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={dataBanner.name}
          className="border"
        />
        <input
          onChange={handleChange}
          type="text"
          name="imageUrl"
          value={dataBanner.imageUrl}
          className="border"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DetailBanner;
