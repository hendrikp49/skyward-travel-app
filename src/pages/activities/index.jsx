import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { ACTIVITIES } from "../api/activity";
import axios from "axios";
import Link from "next/link";

const Activity = () => {
  const [dataActivity, setDataActivity] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    handleDataActivity();
  }, []);

  return (
    <div>
      <h1>test</h1>
      {dataActivity.map((data) => (
        <div key={data.id}>
          <img src={data.imageUrls[0]} alt="" className="w-24 aspect-square" />
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <Link href={`/activity/${data.id}`}>
            <button>Detail</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Activity;
