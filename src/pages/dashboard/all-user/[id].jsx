import { useContext, useEffect, useState } from "react";
import { ALL_USER, UPDATE_ROLE } from "../../api/user";
import { API_KEY, BASE_URL } from "../../api/config";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllUserContext } from "@/contexts/allUserContext";
import { getCookie } from "cookies-next";

const UpdateRole = () => {
  const router = useRouter();
  const [roleUser, setRoleUser] = useState({});
  const { handleDataUser, allUsers } = useContext(AllUserContext);

  const handleUser = () => {
    setRoleUser(allUsers?.find((user) => user.id === router.query.id));
  };

  const handleChange = (e) => {
    setRoleUser({
      ...roleUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      role: roleUser.role,
    };

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    axios
      .post(`${BASE_URL + UPDATE_ROLE + router.query.id}`, payload, config)
      .then((res) => {
        toast.success("Data updated successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          handleDataUser();
          router.push("/dashboard/all-user");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleUser();
    handleDataUser();
  }, [router.query.id]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen text-white font-raleway bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Edit User
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border rounded-xl"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                disabled
                onChange={handleChange}
                className="px-2 disabled:text-slate-400 cursor-not-allowed disabled:bg-slate-200 py-1 rounded-lg text-slate-950"
                type="text"
                name="name"
                value={roleUser?.name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                disabled
                onChange={handleChange}
                className="px-2 disabled:text-slate-400 cursor-not-allowed disabled:bg-slate-200 py-1 rounded-lg text-slate-950"
                type="email"
                name="email"
                value={roleUser?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Role</label>
              <div className="flex gap-5">
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={roleUser?.role === "admin"}
                    className="px-2 py-1 rounded-lg text-slate-950"
                    type="radio"
                    name="role"
                    value="admin"
                    id="admin"
                  />
                  <label htmlFor="admin">Admin</label>
                </div>
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={roleUser?.role === "user"}
                    className="px-2 py-1 rounded-lg text-slate-950"
                    type="radio"
                    name="role"
                    value="user"
                    id="user"
                  />
                  <label>User</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                disabled
                onChange={handleChange}
                className="px-2 py-1 disabled:text-slate-400 disabled:bg-slate-200 cursor-not-allowed rounded-lg text-slate-950"
                type="number"
                name="phoneNumber"
                value={roleUser?.phoneNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profilePictureUrl">Profile Picture</label>
              <input
                disabled
                onChange={handleChange}
                className="px-2 py-1 disabled:text-slate-400 disabled:bg-slate-200 cursor-not-allowed rounded-lg text-slate-950"
                type="text"
                name="profilePictureUrl"
                value={roleUser?.profilePictureUrl}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateRole;
