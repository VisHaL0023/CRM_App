import React, { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllTicketsforTheUser } from "../../Redux/Slices/TicketSlice";

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const ticketsState = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  async function loadTicket() {
    dispatch(getAllTicketsforTheUser());
  }

  function getPercentage(ticketStatus) {
    const totalTickets = ticketsState.ticketList.length;
    let currTicket;

    // Accessing the appropriate property based on ticketStatus
    switch (ticketStatus) {
      case "open":
        currTicket = ticketsState.ticketDistribution.open;
        break;
      case "inProgress":
        currTicket = ticketsState.ticketDistribution.inProgress;
        break;
      case "resolved":
        currTicket = ticketsState.ticketDistribution.resolved;
        break;
      case "onHold":
        currTicket = ticketsState.ticketDistribution.onHold;
        break;
      case "cancelled":
        currTicket = ticketsState.ticketDistribution.cancelled;
        break;
      default:
        // Handle invalid ticketStatus
        console.error("Invalid ticket status");
        return null;
    }

    // Calculate percentage
    const percentage = ((currTicket / totalTickets) * 100).toFixed(2);
    return percentage;
  }

  useEffect(() => {
    loadTicket();
  }, [authState.token]);

  return (
    <HomeLayout>
      <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
        <Card
          titleText="Open"
          status={getPercentage("open")}
          quantity={ticketsState.ticketDistribution.open}
          background="bg-yellow-300"
          borderColor="border-green-300"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <BsFillPencilFill className="inline mr-2" />
        </Card>
        <Card
          titleText="In Progress"
          status={getPercentage("inProgress")}
          quantity={ticketsState.ticketDistribution.inProgress}
          background="bg-orange-300"
          borderColor="border-red-400"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <TbProgressBolt className="inline mr-2" />
        </Card>
        <Card
          titleText="Resolved"
          status={getPercentage("resolved")}
          quantity={ticketsState.ticketDistribution.resolved}
          background="bg-green-300"
          borderColor="border-green-700"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdOutlineDoneAll className="inline mr-2" />
        </Card>
        <Card
          titleText="On Hold"
          status={getPercentage("onHold")}
          quantity={ticketsState.ticketDistribution.onHold}
          background="bg-gray-300"
          borderColor="border-gray-800"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdPending className="inline mr-2" />
        </Card>
        <Card
          titleText="Cancelled"
          status={getPercentage("cancelled")}
          quantity={ticketsState.ticketDistribution.cancelled}
          background="bg-blue-300"
          borderColor="border-violet-500"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdCancel className="inline mr-2" />
        </Card>
      </div>
    </HomeLayout>
  );
};

export default Home;
