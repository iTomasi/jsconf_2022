import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import Atropos from "atropos/react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { jsconfTheme, ViewportSizes } from "../../../styles/theme";
import { GenericLink } from "../TicketSection/shared";

import { atroposCSS } from "./atroposStyles";
import { FakeTicketContainer } from "./components";

const SocialLinks = dynamic(async () => await import("./SocialLinks"), {
  ssr: false,
});

const GetTicket = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const MotionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const StyledAtropos = styled(Atropos)`
  width: 350px;
  height: 480px;

  @media (min-width: ${ViewportSizes.Phone}px) {
    width: 680px;
    height: 380px;
  }
`;

const TicketContainer = styled.div`
  width: 350px;
  height: 480px;
  margin: 0 auto 16px;
  background: ${({ theme }) => theme.colors.jsconfBlack};
  position: relative;
  cursor: pointer;
  overflow: hidden;

  @media (min-width: ${ViewportSizes.Phone}px) {
    width: 680px;
    height: 380px;
  }

  &:before {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: black;
    left: -20px;
    top: 185px;
    content: "";
    position: absolute;
    border-radius: 50%;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    transform: rotate(315deg);
    z-index: 1;
  }

  &:after {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: black;
    right: -20px;
    top: 185px;
    content: "";
    position: absolute;
    border-radius: 50%;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    transform: rotate(315deg);
    z-index: 1;
  }
`;

const TicketInfo = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  position: relative;
  top: 16px;
  left: 16px;
  border: 8px solid ${jsconfTheme.colors.jsconfYellow};

  @media (min-width: ${ViewportSizes.Phone}px) {
    background-position: 435px 154px;
  }

  &:before {
    display: inline-block;
    width: 65px;
    height: 65px;
    background: ${({ theme }) => theme.colors.jsconfBlack};
    left: -40px;
    top: 150px;
    content: "";
    position: absolute;
    border-radius: 50%;
    border-bottom: 8px solid ${({ theme }) => theme.colors.jsconfYellow};
    border-right: 8px solid ${({ theme }) => theme.colors.jsconfYellow};
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    transform: rotate(315deg);
  }

  &:after {
    display: inline-block;
    width: 65px;
    height: 65px;
    background: ${({ theme }) => theme.colors.jsconfBlack};
    right: -40px;
    top: 150px;
    content: "";
    position: absolute;
    border-radius: 50%;
    border-bottom: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${({ theme }) => theme.colors.jsconfYellow};
    border-left: 8px solid ${({ theme }) => theme.colors.jsconfYellow};
    transform: rotate(315deg);
  }
`;

const TicketSection = styled.div`
  padding: 16px 16px 0;
  display: flex;
`;

const TicketHeader = styled.div`
  margin-top: 16px;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const StyledTr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const StyledTd = styled.div`
  padding: 24px;
  flex: 0 0;
  z-index: 2;
`;

const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  min-width: 60px;
`;

const SocialLinkWrapper = styled.div`
  height: 60px;
`;

const TicketUsername = styled.h2`
  color: ${jsconfTheme.colors.jsconfYellow};
`;

const TicketName = styled.h2`
  font-size: 24px;
  line-height: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 32px;
  text-align: left;
  @media (min-width: ${ViewportSizes.Phone}px) {
    font-size: 80px;
    line-height: 80px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  line-height: 20px;
  text-align: left;
  @media (min-width: ${ViewportSizes.Phone}px) {
    font-size: 32px;
    line-height: 32px;
  }
`;

const StyledLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${ViewportSizes.Phone}px) {
    flex-direction: row;
  }
`;

const StyledLine = styled.div`
  border: 1px solid ${jsconfTheme.colors.jsconfYellow};
  text-align: center;
  padding: 8px 0;
  flex: 1 1 50%;

  @media (min-width: ${ViewportSizes.Phone}px) {
    flex: 1 1 25%;
    &:first-of-type {
      margin-left: 0;
    }
  }
`;

const HumanSeasons: { [K: string]: string } = {
  early_bird: "Compra Temprana",
  sale: "Venta",
};

const HumanTypes: { [K: string]: string } = {
  student: "Estudiante",
  adult: "Adulto",
};

const HumanStatus: { [K: string]: string } = {
  created: "Creado",
  not_paid: "Por Pagar",
  failed: "Fallido",
  eliminated: "Eliminado",
  reserved: "Reservado",
  not_redeemed: "Por Canjear",
  offered: "Ofrecido",
  redeemed: "Canjeado",
  // ToCheck
  on_sale: "A la venta",
};

const StyledBackgroundImage = styled.div`
  position: absolute;
  height: 120%;
  width: 120%;
  bottom: -20%;
  right: -20%;
  background-image: url("/images/logo.svg");
  background-size: cover;
  background-position: 106px 304px;
  background-repeat: no-repeat;

  @media (min-width: ${ViewportSizes.Phone}px) {
    background-image: url("/images/logo.svg");
    background-size: cover;
    background-position: 450px 205px;
    background-repeat: no-repeat;
  }
`;

const normalizedString = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const useAnimation = (): MotionProps => {
  return {
    layout: "position" as "position",
    initial: { opacity: 0, scale: 0.9, translateY: 50 },
    animate: { opacity: 1, scale: 1, translateY: 0 },
    exit: { opacity: 0, scale: 0.9, translateY: 50 },
    transition: {
      duration: 1.5,
    },
  };
};

export const Ticket = ({
  userTicketId,
  userPhoto,
  userUsername,
  userName,
  ticketName,
  ticketType,
  ticketSeason,
  userTicketStatus,
  fadeIn,
  showGetTicket = false,
}: {
  userTicketId: string;
  userPhoto: string | null;
  userUsername: string | null;
  userName: string | null;
  ticketName: string;
  ticketType: string;
  ticketSeason: string;
  userTicketStatus: string;
  fadeIn: boolean;
  showGetTicket?: boolean;
}) => {
  const [loaded, setLoaded] = useState(!fadeIn);
  const animation = useAnimation();

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Global styles={[atroposCSS]} />
      <AnimatePresence mode="sync" initial={fadeIn}>
        {!loaded && <FakeTicketContainer {...animation} />}
        {loaded && (
          <MotionContainer {...animation}>
            <StyledAtropos
              highlight
              activeOffset={40}
              shadowScale={1.5}
              shadowOffset={100}
            >
              <TicketContainer
                data-atropos-opacity="1;0.85"
                data-atropos-offset="-5"
              >
                <StyledBackgroundImage data-atropos-offset="-10" />
                <TicketInfo data-atropos-offset="2">
                  <StyledTr data-atropos-offset="2">
                    <TicketHeader>
                      <div style={{ height: "60px" }} data-atropos-offset="8">
                        <StyledImg src={userPhoto ?? ""} />
                      </div>
                      <div style={{ paddingLeft: "16px" }}>
                        <TicketUsername data-atropos-offset="5">
                          {userUsername ? "@" + userUsername : ""}
                        </TicketUsername>
                        <TicketName data-atropos-offset="5">
                          {userName ? normalizedString(userName) : ""}
                        </TicketName>
                      </div>
                    </TicketHeader>
                    <StyledTd data-atropos-offset="5">
                      <Title>JSConf Chile</Title>
                      <SubTitle>Feb.03-04 2023 | Santiago</SubTitle>
                    </StyledTd>
                    <TicketSection style={{ padding: 0 }}>
                      <StyledLineContainer data-atropos-offset="3">
                        <StyledLine data-atropos-offset="1">
                          {ticketName}
                        </StyledLine>
                        <StyledLine data-atropos-offset="2">
                          {HumanTypes[ticketType] ?? ""}
                        </StyledLine>
                        <StyledLine data-atropos-offset="3">
                          {HumanSeasons[ticketSeason] ?? ""}
                        </StyledLine>
                        <StyledLine data-atropos-offset="4">
                          {HumanStatus[userTicketStatus] ?? ""}
                        </StyledLine>
                      </StyledLineContainer>
                    </TicketSection>
                  </StyledTr>
                </TicketInfo>
              </TicketContainer>
            </StyledAtropos>
            <SocialLinkWrapper>
              <Suspense fallback={null}>
                <SocialLinks userTicketId={userTicketId} />
              </Suspense>
            </SocialLinkWrapper>
            {showGetTicket ? (
              <GetTicket>
                <GenericLink href="/tickets">Obtener Tickets</GenericLink>
              </GetTicket>
            ) : null}
          </MotionContainer>
        )}
      </AnimatePresence>
      {/* <AnimatePresence mode="popLayout" initial={false}> */}
    </>
  );
};
