import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    alert("Logout Success");
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
