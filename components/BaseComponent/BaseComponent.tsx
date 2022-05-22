import { Box } from "@chakra-ui/react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Layout from "../Layout/Layout";

const BaseComponent = (props: { children: any }) => {
  return (
    <Layout>
      <Header />
      <Box h="100%">{props.children}</Box>
      <Footer />
    </Layout>
  );
};

export default BaseComponent;
