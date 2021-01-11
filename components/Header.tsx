import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
  theme,
  IconButton,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  ButtonGroup,
} from "@chakra-ui/react";
import { Menu as MenuIcon, ChevronDown, Moon, Sun } from "react-feather";
import Link from "next/link";
import { useAuth } from "../auth";
import firebase from "firebase/app";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
const { localeMap } = require("../i18n");

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, locales, defaultLocale } = router;
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
      px="2rem"
      py="1.5rem"
      bg={useColorModeValue("#fff", "#16151A")}
      borderBottom="1px solid"
      borderColor={useColorModeValue("#E6E6E6", "#242529")}
      style={{
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
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
        <MenuIcon />
      </Button>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} mr={8}>
            <img
              src={
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                locale?.toUpperCase() +
                ".svg"
              }
              width={30}
            />
          </MenuButton>
          <MenuList>
            {localeMap.map((loc: any) => {
              return (
                <MenuItem
                  onClick={async () => {
                    router.push("", "", { locale: loc.countryCode });
                  }}
                  icon={
                    <img
                      src={
                        "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                        loc.countryCode.toUpperCase() +
                        ".svg"
                      }
                      width={30}
                    />
                  }
                >
                  {loc.displayName}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <IconButton
          aria-label="Dark mode switch"
          mr={8}
          icon={
            colorMode === "light" ? (
              <Moon color="#5B1CEE" />
            ) : (
              <Sun color="#5B1CEE" />
            )
          }
          onClick={toggleColorMode}
        />
        {!user ? (
          <Link href="/login">
            <Button colorScheme="brand" color="white" variant="solid">
              <a>{t("navbar-signin")}</a>
            </Button>
          </Link>
        ) : (
          <Menu>
            <MenuButton
              as={Avatar}
              borderRadius="0.375rem"
              height="2.5rem"
              width="2.5rem"
              cursor="pointer"
              src="https://cdn.discordapp.com/attachments/349611593094397952/746134276248043570/P1000825-edit-crop.jpg"
            ></MenuButton>
            <MenuList>
              <MenuItem>{user != null ? user.uid : "No user"}</MenuItem>
              <MenuItem
                onClick={async () => {
                  router.push("/authenticated");
                }}
              >
                {t("navbar-controlpanel")}
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await firebase.auth().signOut();
                  router.push("/");
                }}
              >
                {t("navbar-signout")}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
