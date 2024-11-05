import { API_KEY } from "@/pages/api/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/pages/api/config";
import Link from "next/link";
import { CATEGORY, DELETE_CATEGORY } from "@/pages/api/category";

const Category = () => {
  const [dataCategory, setDataCategory] = useState([]);

  const handleDataCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + CATEGORY}`, config)
      .then((res) => setDataCategory(res.data.data))
      .catch((err) => console.log(err.response));
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_CATEGORY + id}`, config)
      .then((res) => {
        alert("Delete Success");
        handleDataCategory();
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataCategory();
  }, []);

  return (
    <div>
      <Link href="/dashboard/category/create-category">
        <button>Create</button>
      </Link>
      {dataCategory.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 aspect-square"
          />
          <p>{item.name}</p>
          <Link href={`/dashboard/category/${item.id}`}>
            <button>Detail</button>
          </Link>
          <button onClick={() => deleteCategory(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Category;
