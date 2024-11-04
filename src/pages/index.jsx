import { useRouter } from "next/router";
import { API_KEY, BASE_URL } from "./api/config";
import { LOGOUT } from "./api/auth";
import axios from "axios";

const Home = () => {
  const router = useRouter();

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

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
