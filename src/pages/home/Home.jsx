import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useCharts from "../../hooks/useCharts";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";

const Home = () => {
  const [ticketsState] = useTickets();
  const [pieChartData, lineChartData, barChartData] = useCharts();

  function getPercentage(ticketStatus) {
    const totalTickets = ticketsState.downloadedTickets.length;
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

  return (
    <HomeLayout>
      <div className="lg:flex flex-row items-start justify-center">
        <div className="lg:w-2/5 md:w-full">
          <p className="text-2xl mt-3">Check all your tickets status here</p>
          {ticketsState && (
            <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
              <Card
                titleText="Open"
                status={getPercentage("open")}
                quantity={ticketsState.ticketDistribution.open}
                background="bg-yellow-300"
                borderColor="border-yellow-700"
                fontColor="text-black"
                dividerColor="bg-black"
              >
                <BsFillPencilFill className="inline mr-2" />
              </Card>
              <Card
                titleText="In Progress"
                status={getPercentage("inProgress")}
                quantity={ticketsState.ticketDistribution.inProgress}
                background="bg-blue-300"
                borderColor="border-blue-600"
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
                background="bg-red-300"
                borderColor="border-red-700"
                fontColor="text-black"
                dividerColor="bg-black"
              >
                <MdCancel className="inline mr-2" />
              </Card>
            </div>
          )}
        </div>

        <div className="lg:w-3/5 md:w-full">
          <p className="text-2xl mt-3 ml-2">Visualization using charts</p>
          <div className="mt-10 flex justify-center items-center gap-10">
            <div className="w-80 h-80 ">
              <Pie data={pieChartData} />
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center gap-10">
            <div className="w-[40rem] h-[25rem]">
              <Line data={lineChartData} />
            </div>
          </div>

          <div className="mt-10 mb-10 flex justify-center items-center gap-10">
            <div className="w-[50rem] bg-[wheat]">
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
