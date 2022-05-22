import { Box, HStack, Icon, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../Logo";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

interface HeaderData {
  logo: Logo;
  navItems: NavItem[];
}
interface Logo {
  title: string;
  href: string;
}

interface NavItem {
  active: boolean;
  title: string;
  href: string;
  icon?: IconType;
  showIcon?: boolean;
}

const headerData: HeaderData = {
  logo: {
    title: "ShansTees",
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

const Header = () => {
  //   const handleCartClick = (e?: any) => {
  //     if (e?.target.innerHTML !== "Products") {
  //       setNavItemsState((prevState) => {
  //         return {
  //           ...prevState,
  //           showIcon: !prevState.showIcon,
  //           active: true,
  //         };
  //       });
  //     }
  //   };

  const router = useRouter();
  const mapNavItems = (
    navItem: NavItem,
    showNavItem: boolean,
    index: number
  ) => {
    return (
      <ListItem
        key={index}
        display={"flex"}
        alignItems="center"
        fontFamily="primary.heading"
      >
        <Box
          mx="2rem"
          borderBottom={router.pathname === "/" ? "2px solid black" : ""}
        >
          <Link href={navItem.href}>{navItem.title}</Link>
        </Box>
      </ListItem>
    );
  };

  const [showNavItem, setShowNavItem] = useState(false);
  const [navItemsState, setNavItemsState] = useState(headerData.navItems[1]);
  return (
    <HStack justifyContent="space-between" bg="background.100" p="1rem">
      <Logo title={headerData.logo.title} href={headerData.logo.href} />
      <Box display="flex">
        <UnorderedList
          display="flex"
          listStyleType="none"
          px="2rem"
          alignItems="center"
        >
          <>
            {headerData.navItems.map((unit, index) =>
              mapNavItems(unit, showNavItem, index)
            )}
            <ListItem tabIndex={0}>
              {router.pathname !== "/cart" ? (
                <Box cursor="pointer">
                  <Link href="/cart">
                    <Icon as={AiOutlineShoppingCart} w={8} h={8} />
                  </Link>
                </Box>
              ) : (
                <Box
                  borderBottom="2px solid black"
                  fontFamily="primary.heading"
                >
                  <Link href="/cart">Shopping Cart</Link>
                </Box>
              )}
            </ListItem>
          </>
        </UnorderedList>
      </Box>
    </HStack>
  );
};
export default Header;
