import { CREATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateBanner = () => {
  const router = useRouter();
  const [dataBanner, setDataBanner] = useState({
    name: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setDataBanner({
      ...dataBanner,
      [e.target.name]: e.target.value,
    });
  };

  const createDataBanner = (e) => {
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
      .post(`${BASE_URL + CREATE_BANNER}`, payload, config)
      .then((res) => {
        alert("Create Success");
        setTimeout(() => {
          router.push("/dashboard/banner");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form onSubmit={createDataBanner}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
        />
        <button type="submit">Submit</button>
      </form>
      <h1></h1>
    </div>
  );
};

export default CreateBanner;
