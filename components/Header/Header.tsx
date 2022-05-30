import { Box, HStack, Icon, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../Logo";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

export interface HeaderData {
  logo: Logo;
  navItems: NavItem[];
  quantity?: number;
  showQuantity?: boolean;
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

const Header: FC<HeaderData> = ({ quantity, logo, navItems, showQuantity }) => {
  const router = useRouter();
  const mapNavItems = (navItem: NavItem, index: number) => {
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
  return (
    <HStack justifyContent="space-between" bg="background.100" p="1rem">
      <Logo title={logo.title} href={logo.href} />
      <Box display="flex">
        <UnorderedList
          display="flex"
          listStyleType="none"
          px="2rem"
          alignItems="center"
        >
          <>
            {navItems.map((unit, index) => mapNavItems(unit, index))}
            <ListItem tabIndex={0}>
              {router.pathname !== "/cart" ? (
                <Box cursor="pointer" pos="relative">
                  <Link href="/cart">
                    <Icon as={AiOutlineShoppingCart} w={8} h={8} />
                  </Link>
                  <Box
                    display={showQuantity ? "block" : "none"}
                    pos="absolute"
                    top="-14px"
                    right="-11px"
                    border="1px solid orangered"
                    bg="#ff4500b5"
                    color="white"
                    fontWeight="bold"
                    borderRadius="20%"
                    w={7}
                    h={7}
                    textAlign="center"
                  >
                    {quantity}
                  </Box>
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
