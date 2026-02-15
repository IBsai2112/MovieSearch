import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #242424;
`;

const Text = styled(motion.span)`
  font-size: clamp(40px, 8vw, 100px);
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 10px;
`;

const Loader = () => {
  return (
    <Container
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}   // slide down animation
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <DotLottieReact
        src="https://lottie.host/60db390c-76b5-4db7-b091-1b1c4092eefb/ZI4PzUvraG.lottie"
        loop
        autoplay
        style={{ width: "120px", height: "120px" }}
      />

      <Text
        style={{ fontSize: "5vh" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        SaiFlix
      </Text>
    </Container>
  );
};

export default Loader;

