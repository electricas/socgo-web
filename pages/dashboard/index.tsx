import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { verifyIdToken } from "../../util/auth/firebaseAdmin";
import firebaseClient from "../../util/auth/firebaseClient";
import {
  Box,
  Text,
  Heading,
  Center,
  Kbd,
  Divider,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Button,
  Flex,
  Skeleton,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import FlexContainer from "../../components/FlexContainer";
import { Edit3, AlertTriangle, Plus, Trash2 } from "react-feather";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Metadata from "../../components/Metadata";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Header from "../../components/Header";
import db from "../../util/db";
import { useAuth } from "../../util/auth/auth";
import firebase from "firebase";

function Dashboard({ session }: any) {
  firebaseClient();
  const easing = [0.6, -0.05, 0.01, 0.99];
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const { userClaims }: any = useAuth();
  const router = useRouter();
  const { t } = useTranslation("home");
  const { locale, locales, defaultLocale } = router;
  const [sights, setSights] = useState(null);
  useEffect(() => {
    (async () => {
      const sights = await db.collection("sights").get();
      const sightsData = sights.docs.map((sight) => ({
        id: sight.id,
        ...sight.data(),
      }));
      setSights((sightsData as unknown) as any);
    })();
  }, []);
  if (session) {
    if (
      userClaims != undefined &&
      userClaims.hasOwnProperty("admin") &&
      userClaims.admin
    ) {
      return (
        <FlexContainer>
          <Head>
            <title>{t("common:navbar-dashboard")} | SocGo!</title>
          </Head>
          <Metadata />
          <Header />
          <Box display={["block", "none"]}>
            <Heading p={5}>
              This part of the website isn't available on mobile devices.
            </Heading>
          </Box>
          <Box display={["none", "block"]}>
            <motion.div
              exit={{ opacity: 0 }}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={stagger}>
                <motion.div variants={fadeInUp}>
                  <Center>
                    <Input
                      id="searchInput"
                      placeholder={t("common:dash-searchsights")}
                      variant="filled"
                      size="lg"
                      maxW="400px"
                      m={6}
                      onKeyPress={async (val) => {
                        var input;
                        var inputValue: string;
                        if (val.key == "Enter") {
                          input = document.getElementById(
                            "searchInput"
                          ) as HTMLInputElement;
                          inputValue = input.value;
                          if (inputValue != null) {
                            const sights = await db
                              .collection("sights")
                              .where("name", ">=", inputValue)
                              .where("name", "<=", inputValue + "\uf8ff")
                              .get();
                            const sightsData = sights.docs.map((sight) => ({
                              id: sight.id,
                              ...sight.data(),
                            }));
                            setSights((sightsData as unknown) as any);
                          }
                        }
                      }}
                    />
                  </Center>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Box
                    py={4}
                    px={10}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Heading size="lg">{t("common:dash-sights")}</Heading>
                    <Link href="/dashboard/sight/create">
                      <Button
                        colorScheme="brand"
                        leftIcon={<Plus />}
                        color="white"
                        variant="solid"
                      >
                        <a>{t("common:dash-createsight")}</a>
                      </Button>
                    </Link>
                  </Box>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Box p={4}>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>{t("common:dash-sight-name")}</Th>
                          <Th>{t("common:dash-sight-description")}</Th>
                          <Th>{t("common:dash-sight-location")}</Th>
                          <Th></Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sights != null ? (
                          // @ts-ignore
                          sights.map((s: any, i: any) => (
                            <Tr key={i}>
                              <Td>{s.name}</Td>
                              <Td>{s.description}</Td>
                              <Td>
                                {s.location.latitude}, {s.location.longitude}
                              </Td>
                              <Td>
                                <Popover>
                                  {({ isOpen, onClose }) => (
                                    <>
                                      <PopoverTrigger>
                                        <IconButton
                                          aria-label={"Delete " + s.name}
                                          size="sm"
                                          icon={
                                            <a>
                                              <Trash2 />
                                            </a>
                                          }
                                        />
                                      </PopoverTrigger>
                                      <PopoverContent>
                                        <PopoverHeader>
                                          <Heading size="md">
                                            {t(
                                              "common:dash-sight-delete-confirm-title"
                                            )}
                                          </Heading>
                                        </PopoverHeader>
                                        <PopoverBody>
                                          {t(
                                            "common:dash-sight-delete-confirm-content"
                                          )}
                                        </PopoverBody>
                                        <PopoverFooter border="none">
                                          <Button
                                            colorScheme="red"
                                            onClick={async () => {
                                              await firebase
                                                .firestore()
                                                .collection("sights")
                                                .doc(s.id)
                                                .delete()
                                                .then(async () => {
                                                  const sights = await db
                                                    .collection("sights")
                                                    .get();
                                                  const sightsData = sights.docs.map(
                                                    (sight) => ({
                                                      id: sight.id,
                                                      ...sight.data(),
                                                    })
                                                  );
                                                  setSights(
                                                    (sightsData as unknown) as any
                                                  );
                                                  onClose();
                                                });
                                            }}
                                          >
                                            {t(
                                              "common:dash-sight-delete-confirm-btn"
                                            )}
                                          </Button>
                                        </PopoverFooter>
                                      </PopoverContent>
                                    </>
                                  )}
                                </Popover>
                              </Td>
                              <Td>
                                <Link
                                  href={`/dashboard/sight/${encodeURIComponent(
                                    s.id
                                  )}`}
                                >
                                  <IconButton
                                    aria-label={"Edit " + s.name}
                                    size="sm"
                                    icon={
                                      <a>
                                        <Edit3 />
                                      </a>
                                    }
                                  />
                                </Link>
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr key="loading">
                            <Td>
                              <Skeleton>Loading.</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                Loading a lot of stuff, like really, a lot.
                              </Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Loading.</Skeleton>
                            </Td>
                            <Td>
                              <Link href="#">
                                <IconButton
                                  aria-label="Deleting is disabled while loading"
                                  isDisabled
                                  size="sm"
                                  icon={
                                    <a>
                                      <Trash2 />
                                    </a>
                                  }
                                />
                              </Link>
                            </Td>
                            <Td>
                              <Link href="#">
                                <IconButton
                                  aria-label="Editing is disabled while loading"
                                  isDisabled
                                  size="sm"
                                  icon={
                                    <a>
                                      <Edit3 />
                                    </a>
                                  }
                                />
                              </Link>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </Box>
                </motion.div>
              </motion.div>
            </motion.div>
          </Box>
        </FlexContainer>
      );
    } else if (
      userClaims != undefined &&
      (!userClaims.hasOwnProperty("admin") || !userClaims.admin)
    ) {
      return (
        <FlexContainer>
          <Head>
            <title>{t("common:navbar-dashboard")} | SocGo!</title>
          </Head>
          <Metadata />
          <Flex h="100vh" justifyContent="center" alignItems="center">
            <motion.div
              exit={{ opacity: 0 }}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <Box p={5}>
                  <Center pb={5}>
                    <AlertTriangle />
                  </Center>
                  <Heading as="h2" size="md">
                    {t("common:dash-onlyadmins")}
                  </Heading>
                </Box>
              </motion.div>
            </motion.div>
          </Flex>
        </FlexContainer>
      );
    } else {
      return (
        <Center height="100vh">
          <Heading as="h3" size="lg">
            Loading...
          </Heading>
          <Center width="2em" height="2em">
            <Divider orientation="vertical" />
          </Center>
          <Text>
            If this is taking too long, try using <Kbd>F5</Kbd> to refresh the
            page.
          </Text>
        </Center>
      );
    }
  } else {
    return (
      <Center height="100vh">
        <Heading as="h3" size="lg">
          Loading...
        </Heading>
        <Center width="2em" height="2em">
          <Divider orientation="vertical" />
        </Center>
        <Text>
          If this is taking too long, try using <Kbd>F5</Kbd> to refresh the
          page.
        </Text>
      </Center>
    );
  }
}

export async function getServerSideProps(ctx: any) {
  try {
    const cookies = nookies.get(ctx);
    let tokenJson = "";
    let token;
    const tokenQ = await verifyIdToken(cookies.token).then((tok) => {
      token = tok;
      tokenJson = JSON.stringify(tok);
    });

    if (token == null) {
      console.log("token is invalid, refreshing");
      firebase
        .auth()
        .currentUser?.getIdToken(true)
        .then((newToken) => {
          nookies.set(undefined, "token", newToken, {
            maxAge: 3300,
          });
        });
      return {};
    }

    const tokenObj = JSON.parse(tokenJson);

    return {
      props: {
        session: tokenObj.user_id,
      },
    };
  } catch (err) {
    ctx.res.writeHead(302, { location: "/login" });
    ctx.res.end();
    return { props: [] };
  }
}

export default Dashboard;
