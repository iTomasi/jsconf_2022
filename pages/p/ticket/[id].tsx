import styled from "@emotion/styled";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { DefaultPagelayout } from "../../../src/Components/Layouts/DefaultPagelayout";
import { Ticket } from "../../../src/Components/Ticket/Ticket";

import { PublicTicket } from "../../../src/helpers/API/types";

export const config = {
  runtime: "experimental-edge",
};

const StyledSpacer = styled.div(({ theme }) => ({
  height: 100,
}));

const TicketPage = ({
  ticket,
  ticketApiUrl,
}: {
  ticket: PublicTicket;
  ticketApiUrl: string;
}) => {
  return (
    <div>
      <Head>
        <title>Ticket: ${ticket.username} | JSConf CL</title>
        <meta
          name="description"
          content="Mi Ticket para ir a la JSConf, unete a la primera "
        />

        <meta property="og:url" content="https://www.jsconf.cl/tickets" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${ticket.username} 💛 JSConf Chile`}
        />
        <meta
          property="og:description"
          content="Mi Ticket para ir a la JSConf. Únete a la primera!"
        />
        <meta
          property="og:image"
          content={`${ticketApiUrl}/ticket/image/${ticket.ticketId}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.jsconf.cl" />
        <meta property="twitter:url" content="https://www.jsconf.cl/tickets" />
        <meta
          name="twitter:title"
          content={`${ticket.username} 💛 JSConf Chile`}
        />
        <meta
          name="twitter:description"
          content="Mi Ticket para ir a la JSConf! Únete a la primera!"
        />
        <meta
          name="twitter:image"
          content={`${ticketApiUrl}/ticket/image/${ticket.ticketId}`}
        />
      </Head>
      <StyledSpacer />
      <Ticket
        userTicketId={ticket.ticketId}
        userTicketStatus={ticket.status}
        userPhoto={ticket?.userPhoto ?? ""}
        userUsername={ticket?.username ?? ""}
        userName={ticket?.name ?? ""}
        ticketName={ticket.ticketName}
        ticketType={ticket.ticketType}
        ticketSeason={ticket.ticketSeason}
      />
    </div>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { id } = query;
  if (!id) {
    throw new Error(`No ID present`);
  }
  if (Array.isArray(id)) {
    throw new Error(`ID should be a singl string, not an array`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tickets/qr/info/user_ticket_${id}`
  );
  const ticket = await response.json();
  if (ticket.statusCode === 500) {
    throw new Error(`Could not find ticket with id ${id}`);
  }
  return { props: { ticket, ticketApiUrl: process.env.WORKER_IMAGE_API } };
};

TicketPage.getLayout = DefaultPagelayout;

export default TicketPage;
