import React, { Suspense } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { H2, H3 } from "../core/Typography";
import Description from "../core/Description";
import Image from "../core/Image";
import { PageProps } from "../../../pages";
import useMediaQuery from "../../helpers/useMediaQuery";

const Container = styled.section`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  gap: 0px 32px;
  padding: 48px;
  justify-content: space-between;

  > h2 {
    padding: 48px 0px;
  }

  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;

const BlockContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
  justify-content: center;
  max-width: 1440px;
  overflow: hidden;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Block = styled(motion.section)`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px 0px;
  min-width: 255px;
  width: 100%;
  border-radius: 0px 32px 0px 0px;
  height: 257px;
  overflow: hidden;
  @media (min-width: 1024px) {
    max-width: 50%;
  }
`;

const BlockDescription = styled(motion.section)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  right: 0px;
  padding: 16px;
  gap: 16px 0px;
  border-radius: 0px 32px 0px 0px;
  background: rgba(244, 91, 105, 0.2);

  ul {
    padding: 16px;
    list-style: disc;
  }
`;

const Flex = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 0px 32px 0px 0px;

  picture:nth-child(2) {
    width: 30%;
  }
`;

const descriptionVariant = {
  initial: {},
  hover: {
    backgroundColor: "rgba(244, 91, 105, 0.7)",
    transition: {
      duration: 0.2,
      opacity: {
        delay: 0.2,
        duration: 0.2,
      },
    },
  },
};

const HowSection = (props: { page: PageProps["howItems"] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Container>
      <Suspense fallback={<h1>Loading How...</h1>}>
        <H2 whileHover={{ scale: 1.01 }}>How</H2>
        <BlockContainer>
          {props.page?.items?.map((props, index) => (
            <Block
              key={`how-block-${index}`}
              whileHover="hover"
              whileFocus="hover"
              whileTap="hover"
              initial="initial"
            >
              <Flex>
                <Image
                  mobile={props?.image?.url!}
                  alt={props?.image?.description! || ""}
                  style={{
                    height: "257px",
                    aspectRatio: "654 / 257",
                  }}
                />
                <Image
                  mobile={props?.image?.url!}
                  alt={props?.image?.description! || ""}
                  style={{
                    transform: "scaleX(-1)",
                    height: "257px",
                    aspectRatio: "654 / 257",
                    objectFit: "cover",
                    borderRadius: "32px  0px 0px  0px",
                    objectPosition: "right",
                  }}
                />
              </Flex>
              <BlockDescription
                key={`how-block-description-${index} `}
                variants={descriptionVariant}
              >
                <H3>{props?.title}</H3>
                <Description data={props?.description?.json!} />
              </BlockDescription>
            </Block>
          ))}
        </BlockContainer>
      </Suspense>
    </Container>
  );
};

export default HowSection;
