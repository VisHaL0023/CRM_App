import {
  Button,
  Card,
  CardHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";
import { createTicket } from "../../Redux/Slices/TicketSlice";

function CreateTicket() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useTickets();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    ticketPriority: 3,
    status: "open",
    clientName: auth.data.clientName,
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!ticket.title || !ticket.description) {
      toast.error("Title and description are mandatory");
      return;
    }
    const response = await dispatch(createTicket(ticket));
    if (response?.payload?.status == 201) {
      // ticket got created successfully
      setTicket({
        title: "",
        description: "",
        ticketPriority: 3,
        status: "open",
        clientName: auth.data.clientName,
      });
    }
  }

  return (
    <HomeLayout>
      <div className="flex felx-col items-center justify-center mt-5 p-5">
        <div className="flex-col items-center justify-center mr-16 md:hidden sm:hidden lg:block">
          <Typography variant="h2" color="blue-gray">
            Create your ticket
          </Typography>
          <Typography color="gray" className="mt-1 font-normal w-96">
            Please add your ticket and description in datails to get to your
            problem.
          </Typography>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className="text-primary-content">
              <Card className="mt-6 p-5">
                <CardHeader
                  variant="gradient"
                  color="gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Create Ticket
                  </Typography>
                </CardHeader>
                <form
                  className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={onFormSubmit}
                >
                  <div className="mb-1 flex flex-col gap-3">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Title
                    </Typography>
                    <Input
                      size="md"
                      value={ticket.title}
                      onChange={handleFormChange}
                      name="title"
                      placeholder="Enter your ticket heading"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />

                    <Textarea
                      value={ticket.description}
                      onChange={handleFormChange}
                      name="description"
                      variant="outlined"
                      label="Description"
                      rows={8}
                    />
                  </div>

                  <Button className="mt-6" fullWidth type="submit">
                    Create ticket
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CreateTicket;
