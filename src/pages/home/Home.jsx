import React, { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllTicketsforTheUser } from "../../Redux/Slices/TicketSlice";

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const ticketState = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  async function loadTicket() {
    dispatch(getAllTicketsforTheUser());
  }

  useEffect(() => {
    loadTicket();
  }, [authState.token]);

  return (
    <HomeLayout>
      {/* <Card>
        <BsFillPencilFill className="inline mr-2" />
      </Card>
      <Card
        status={30}
        background="bg-yellow-300"
        borderColor="border-green-300"
        fontColor="text-black"
        dividerColor="bg-black"
      >
        <BsFillPencilFill className="inline mr-2" />
      </Card> */}
    </HomeLayout>
  );
};

export default Home;
