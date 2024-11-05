import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../api/config";
import { ALL_USER } from "../../api/user";
import Link from "next/link";
import { useParams } from "next/navigation";

const AllUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_Page: 5,
    total_Page: 0,
  });

  const handleDataUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: API_KEY,
      },
    };
    axios
      .get(`${BASE_URL + ALL_USER}`, config)
      .then((res) => {
        setDataUser(res.data.data);
        setPagination({
          ...pagination,
          total_Page: Math.ceil(res.data.data.length / pagination.per_Page),
        });
      })
      .catch((err) => console.log(err));
  };

  const indexFirstUser =
    pagination.page * pagination.per_Page - pagination.per_Page;
  const indexLastUser = pagination.page * pagination.per_Page;
  const dataPage = dataUser.slice(indexFirstUser, indexLastUser);

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleDataUser();
  }, []);

  return (
    <div>
      {dataPage.map((item) => (
        <div key={item.id}>
          <img
            src={item.profilePictureUrl}
            alt=""
            className="w-24 rounded-full aspect-square"
          />
          <h1>{item.name}</h1>
          <p>{item.email}</p>
          <p>{item.role}</p>
          <p>{item.phoneNumber}</p>
          <Link href={`/dashboard/${item.id}`}>
            <button>Detail</button>
          </Link>
        </div>
      ))}
      <button onClick={handleBack} disabled={pagination.page === 1}>
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={pagination.page === pagination.total_Page}
      >
        Next
      </button>
    </div>
  );
};

export default AllUser;
