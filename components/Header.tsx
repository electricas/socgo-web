import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Menu, Moon, Sun } from "react-feather";
import Link from "next/link";
import { useAuth } from "../auth";

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props: any) => {
  const [show, setShow] = React.useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggle = () => setShow(!show);
  const { user }: any = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px="1.5rem"
      py="0.3rem"
      style={{ backdropFilter: "blur(20px)" }}
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.72)"
          : "rgba(26, 32, 44, 0.72)"
      }
      borderBottom="1px solid rgba(0, 0, 0, 0.2)"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md">
          <Link href="/">
            <a>SocGo!</a>
          </Link>
        </Heading>
      </Flex>
      <Box width={5} />

      <Button
        size="sm"
        display={{ base: "block", md: "none" }}
        variant="solid"
        onClick={handleToggle}
      >
        <Menu></Menu>
      </Button>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>{`${user ? user.uid : "No user signed in"}`}</MenuItems>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/authenticated">
          <Button size="sm" mr={4} isDisabled={!user}>
            <a>Go to authenticated route</a>
          </Button>
        </Link>
        <Button size="sm" mr={4} onClick={toggleColorMode}>
          {colorMode === "light" ? <Moon /> : <Sun />}
        </Button>
        {!user ? (
          <Link href="/login">
            <Button size="sm" colorScheme="blue" variant="solid">
              <a>Sign in</a>
            </Button>
          </Link>
        ) : (
          <Link href="/authenticated">
            <Button size="sm" colorScheme="blue" variant="solid">
              <a>Control Panel</a>
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
