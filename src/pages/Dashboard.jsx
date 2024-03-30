import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  List,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { usePDF } from "react-to-pdf";

import CheckBox from "../components/CheckBox";
import TicketDetailsModal from "../components/TicketDetailsModal";
import { extactDate, getColorTicketStatus } from "../helper/helper";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";

function Dashboard() {
  const [ticketState] = useTickets();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectedTicket, setSelectedTicket] = useState({});
  const [filterValue, setFilterValue] = useState([]);
  const [filteredTicket, setFilteredTicket] = useState(ticketState.ticketList);
  const [currPage, setCurrPage] = useState(1);

  let ticketPerPage = 8;
  const startIndex = (currPage - 1) * ticketPerPage;
  const endIndex = startIndex + ticketPerPage;
  const totalPages = Math.ceil(filteredTicket.length / ticketPerPage);

  const TICKET_HEAD = [
    "Ticket Id",
    "Title",
    "Reporter",
    "Priority",
    "Status",
    "Date",
  ];

  const goToPrevPage = () => {
    setCurrPage(currPage - 1);
  };

  const goToNextPage = () => {
    setCurrPage(currPage + 1);
  };

  function applyFilter(ticketList, filterValue) {
    let updatedTicket = [...ticketList];
    if (filterValue.length) {
      updatedTicket = updatedTicket.filter((ticket) =>
        filterValue.includes(ticket.status)
      );
    }
    return updatedTicket; // Return the updated array
  }

  const handleLocationFilterChange = (event) => {
    const status = event.target.value;
    const isChecked = event.target.checked;
    setFilterValue((prevState) => {
      if (isChecked) {
        // If checked then add to filterValue
        return [...prevState, status];
      } else {
        // If not checked then remove
        return prevState.filter((item) => item !== status);
      }
    });
  };

  // UseEffect to apply filter when filterValue changes
  useEffect(() => {
    const filteredTickets = applyFilter(ticketState.ticketList, filterValue);
    setFilteredTicket(filteredTickets); // Update the filtered tickets state
    setCurrPage(1);
  }, [filterValue]);

  // UseEffect to set filteredTicket initially to ticketState
  useEffect(() => {
    setFilteredTicket(ticketState.ticketList);
    setCurrPage(1);
  }, [ticketState.ticketList]);

  useEffect(() => {
    if (selectedTicket._id) {
      document.getElementById("ticket_modal").showModal();
    }
  }, [selectedTicket]);

  return (
    <HomeLayout>
      <div className="flex mt-5">
        <div className="flex w-1/4 h-[450px]">
          <Card>
            <List>
              <div className="p-2 divide-y">
                <div className="flex gap-2 items-center justify-center my-3">
                  <FiFilter className="w-5 h-5 mr-1" />
                  <p className="text-2xl">Filter</p>
                </div>
                <div className="pt-3">
                  <p className="text-lg mb-1">By status</p>
                  <CheckBox
                    filterValue={filterValue}
                    handleLocationFilterChange={handleLocationFilterChange}
                  />
                </div>
              </div>
            </List>
          </Card>
        </div>
        <Card className="h-full w-3/4 ">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-1 flex flex-col items-center justify-center content-center gap-2">
              <Typography variant="h2" color="blue-gray">
                Ticket list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all tickets
              </Typography>
              <AiOutlineDownload
                className="cursor-pointer w-6 h-6 right-0 absolute"
                onClick={() => toPDF()}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table
              ref={targetRef}
              className="mt-1 w-full min-w-max table-auto text-left"
            >
              <thead>
                <tr>
                  {TICKET_HEAD.map((head, index) => (
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
                        {index !== TICKET_HEAD.length - 1 && (
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
                {filteredTicket
                  .slice(startIndex, endIndex)
                  .map((ticket, index) => {
                    const isLast = index === filteredTicket.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={ticket._id}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {ticket._id.substring(0, 5) + "..."}
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
                              {ticket.title}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {ticket.assignee}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {ticket.ticketPriority}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={ticket.status}
                            color={getColorTicketStatus(ticket.status)}
                          />
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {extactDate(ticket.createdAt)}
                            </Typography>
                          </div>
                        </td>
                        <td
                          className={classes}
                          onClick={() => {
                            setSelectedTicket(ticket);
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
      </div>
      <TicketDetailsModal ticket={selectedTicket} key={selectedTicket._id} />
    </HomeLayout>
  );
}

export default Dashboard;
