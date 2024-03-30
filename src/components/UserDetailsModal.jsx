import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDisplay, setUserDisplay] = useState(user);

  async function handleUserChange(e) {
    try {
      const ul = e.target.parentNode.parentNode;
      const name = ul.getAttribute("name");
      const dropdown = document.getElementById(`${name}Dropdown`);
      dropdown.open = !dropdown.open;
      toast("Updating the user....");
      const response = await axiosInstance.patch(
        "user/updateUser",
        {
          userId: userDisplay.id,
          updates: {
            ...userDisplay,
            [name]: e.target.textContent,
          },
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (response?.data?.result) {
        toast.success("Successfully updated the user");
        const user = response?.data?.result;
        setUserDisplay({
          ...userDisplay,
          name: user.name,
          email: user.email,
          userStatus: user.userStatus,
          userType: user.userType,
          clientName: user.clientName,
        });
        resetTable();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <dialog id="user_details_modal" className="modal mt-3">
      <Card className="mt-6 w-[30rem] h-[30rem]">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-20 place-items-center"
        >
          <Typography variant="h3" color="white">
            User Details
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="bg-gray-100 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Name :</p>
              <p className="text-black text-md mb-2">{userDisplay.name}</p>
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Client name :</p>
              <p className="text-black text-md mb-2">
                {userDisplay.clientName}
              </p>
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Status :</p>
              <span className="text-black">
                <details className="dropdown" id="userStatusDropdown">
                  <summary className="btn bg-blue-gray-300 px-1 py-1 rounded-md">
                    {userDisplay.userStatus}
                  </summary>
                  <ul
                    name="userStatus"
                    onClick={handleUserChange}
                    className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>approved</a>
                    </li>
                    <li>
                      <a>suspended</a>
                    </li>
                    <li>
                      <a>rejected</a>
                    </li>
                  </ul>
                </details>
              </span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Type :</p>
              <span className="text-black">
                <details className="dropdown" id="userStatusDropdown">
                  <summary className="btn bg-blue-gray-300 px-1 py-1 rounded-md">
                    {userDisplay.userType}
                  </summary>
                  <ul
                    name="userStatus"
                    onClick={handleUserChange}
                    className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>customer</a>
                    </li>
                    <li>
                      <a>admin</a>
                    </li>
                    <li>
                      <a>engineer</a>
                    </li>
                  </ul>
                </details>
              </span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Type :</p>
              <p className="text-black text-md mb-2">{userDisplay.userType}</p>
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="flex-grow">Email :</p>
              <p className="text-black text-md mb-2">{userDisplay.email}</p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop mt-3">
            <button>
              <Button>Close</Button>
            </button>
          </form>
        </CardBody>
      </Card>
    </dialog>
  );
}

export default UserDetailsModal;
