import { ACTIVITIES, DELETE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Activity = () => {
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

  const deleteActivity = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_ACTIVITY + id}`, config)
      .then((res) => {
        alert(res.data.message);
        handleDataActivity();
      })
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    handleDataActivity();
  }, []);

  return (
    <div>
      <Link href="/dashboard/activity/create-activity">
        <button>Create</button>
      </Link>
      {dataActivity.map((activity) => (
        <div key={activity.id}>
          <img
            src={activity.imageUrls[activity.imageUrls.length - 1]}
            alt={activity.title}
            className="w-24 aspect-square"
          />
          <h1>{activity.title}</h1>
          <p>{activity.category.name}</p>
          <Link href={`/dashboard/activity/edit-activity/${activity.id}`}>
            <button>Detail</button>
          </Link>
          <button onClick={() => deleteActivity(activity.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Activity;
