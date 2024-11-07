import { useRouter } from "next/router";
import { API_KEY, BASE_URL } from "./api/config";
import { LOGOUT } from "./api/auth";
import axios from "axios";
import { ACTIVITIES, DELETE_ACTIVITY } from "@/pages/api/activity";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [dataActivity, setDataActivity] = useState([]);

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITIES}`, config)
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + LOGOUT}`, config)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        alert("Logout Success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataActivity();
  });

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>

      {dataActivity.map((activity) => (
        <div key={activity.id}>
          <img
            src={activity.imageUrls[activity.imageUrls.length - 1]}
            alt={activity.title}
            className="w-24 aspect-square"
          />
          <h1>{activity.title}</h1>
          <p>{activity.category.name}</p>
          <Link href={`/activity/${activity.id}`}>
            <button>Detail</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
