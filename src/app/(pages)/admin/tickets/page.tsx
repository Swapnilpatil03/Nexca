"use client";
import { TicketCard } from "@/components";
import { TICKETS_API_URL } from "@/config/apiConstants";
import { TICKETS_QUERY_KEY } from "@/config/Constants";
import useFetch from "@/hooks/useFetch";
import { TicketsCashType } from "@/types/CashTypes";
import { checkMaster } from "@/util/Util";
import React from "react";
import TicketsSkeleton from "./TicketsSkeleton";

const AdminTicketsPage: React.FC = () => {
  const { data: tickets, loading } = useFetch(
    TICKETS_QUERY_KEY,
    TICKETS_API_URL
  );
  let master = checkMaster();
  if (loading) {
    return <TicketsSkeleton />;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tickets?.map((ticket: TicketsCashType) => (
          <TicketCard ticket={ticket} key={ticket._id} master={master} />
        ))}
      </div>
    </>
  );
};
export default AdminTicketsPage;
