import Sidebar from "@/components/Layout/Sidebar";
import { isOpen } from "@/components/Layout/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex items-center justify-center w-full h-screen bg-slate-800">
        <img
          src="images/dashboard.png"
          alt="dashboard image"
          className="object-cover w-[500px]"
        />
      </main>
    </div>
  );
};

export default Dashboard;
