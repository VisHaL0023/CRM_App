import { ChevronUpDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import UserDetailsModal from "../../components/UserDetailsModal";
import axiosInstance from "../../config/axiosInstance";
import { getColorUserStatus } from "../../helper/helper";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {
  const [userList, setUserList] = useState([]);
  const [userDisplay, setUserDisplay] = useState({
    name: "",
    email: "",
    userType: "",
    userStatus: "",
    clientName: "",
    id: "",
  });
  const [currPage, setCurrPage] = useState(1);

  let ticketPerPage = 8;
  const startIndex = (currPage - 1) * ticketPerPage;
  const endIndex = startIndex + ticketPerPage;
  const totalPages = Math.ceil(userList.length / ticketPerPage);

  const USERS_HEAD = [
    "User Id",
    "Email",
    "Name",
    "Status",
    "Type",
    "Client Name",
  ];

  const goToPrevPage = () => {
    setCurrPage(currPage - 1);
  };

  const goToNextPage = () => {
    setCurrPage(currPage + 1);
  };

  async function loadUsers() {
    const response = await axiosInstance.get("/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    setUserList(response?.data?.result);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    console.log("userDisplay", userDisplay);
    if (userDisplay.id) {
      document.getElementById("user_details_modal").showModal();
    }
  }, [userDisplay]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center mt-3">
        {userList && (
          <Card className="h-full w-[85%]">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-1 flex flex-col items-center justify-center content-center gap-2">
                <Typography variant="h2" color="blue-gray">
                  User's list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all user's
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-1 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {USERS_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {head}{" "}
                          {index !== USERS_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {userList.slice(startIndex, endIndex).map((user, index) => {
                    const isLast = index === userDisplay.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={user._id}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user._id}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.email}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.name}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={user.userStatus}
                            color={getColorUserStatus(user.userStatus)}
                          />
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.userType}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.clientName}
                            </Typography>
                          </div>
                        </td>
                        <td
                          className={classes}
                          onClick={() => {
                            setUserDisplay({
                              name: user.name,
                              clientName: user.clientName,
                              email: user.email,
                              userStatus: user.userStatus,
                              userType: user.userType,
                              id: user._id,
                            });
                            console.log("user", user);
                          }}
                        >
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page {currPage} of {totalPages}
              </Typography>
              <div className="flex gap-2">
                {currPage === 1 ? (
                  <></>
                ) : (
                  <Button variant="outlined" size="sm" onClick={goToPrevPage}>
                    Previous
                  </Button>
                )}
                {currPage === totalPages ? (
                  <></>
                ) : (
                  <Button variant="outlined" size="sm" onClick={goToNextPage}>
                    Next
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
      <UserDetailsModal
        key={userDisplay.email}
        user={userDisplay}
        resetTable={loadUsers}
      />
    </HomeLayout>
  );
}

export default ListAllUsers;
