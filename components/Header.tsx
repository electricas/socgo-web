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
  MenuDivider,
} from "@chakra-ui/react";
import { Menu as MenuIcon, ChevronDown, Moon, Sun } from "react-feather";
import Link from "next/link";
import { useAuth } from "../util/auth/auth";
import firebase from "firebase/app";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
const { localeMap } = require("../i18n");

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
      py="0.5rem"
      bg={useColorModeValue("#fff", "#121212")}
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
        size="xs"
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
          {/* ts bug in chakra-ui -- caused by as={<>} */}
          <MenuButton as={Button} size="sm" rightIcon={<ChevronDown />} mr={4}>
            <img src={`/flags/${locale}.svg`} width={24} />
          </MenuButton>
          <MenuList>
            {localeMap.map((loc: any) => {
              return (
                <MenuItem
                  key={loc.countryCode}
                  onClick={async () => {
                    router.push("", "", { locale: loc.countryCode });
                  }}
                  icon={
                    <img
                      src={"/flags/" + loc.countryCode + ".svg"}
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
          mr={4}
          size="sm"
          icon={
            colorMode === "light" ? (
              <Moon color="#E0153B" />
            ) : (
              <Sun color="#E0153B" />
            )
          }
          onClick={toggleColorMode}
        />
        {!user ? (
          <Link href="/login">
            <Button colorScheme="brand" size="sm" color="white" variant="solid">
              <a>{t("navbar-signin")}</a>
            </Button>
          </Link>
        ) : (
          <Menu>
            <MenuButton
              as={Avatar}
              borderRadius="0.375rem"
              height="2rem"
              width="2rem"
              cursor="pointer"
              src={firebase.auth().currentUser?.photoURL}
            ></MenuButton>
            <MenuList>
              <MenuItem>{user != null ? user.displayName : "No user"}</MenuItem>
              <MenuItem
                onClick={async () => {
                  router.push("/dashboard");
                }}
              >
                {t("navbar-dashboard")}
              </MenuItem>
              <MenuDivider />
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
