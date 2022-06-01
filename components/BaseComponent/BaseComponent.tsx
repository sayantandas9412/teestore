import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import Footer from "../Footer/Footer";
import Header, { HeaderData } from "../Header/Header";
import Layout from "../Layout/Layout";

interface BaseComponentProps {
  children?: any;
  quantity?: number;
}

const BaseComponent: FC<BaseComponentProps> = ({ children, quantity }) => {
  const headerData: HeaderData = {
    logo: {
      title: "TeeStore",
      href: "/",
    },
    navItems: [
      {
        title: "Products",
        href: "/",
        showIcon: false,
        active: true,
      },
    ],
  };
  return (
    <Layout>
      <Header {...headerData} quantity={quantity} />
      <Box minH="110vh">{children}</Box>
      <Footer />
    </Layout>
  );
};

export default BaseComponent;
