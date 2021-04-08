import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Kbd,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import nookies from "nookies";
import React, { useEffect, useState } from "react";
import { AlertTriangle } from "react-feather";
import FlexContainer from "../../../components/FlexContainer";
import Header from "../../../components/Header";
import Metadata from "../../../components/Metadata";
import SightForm from "../../../components/SightForm";
import { useAuth } from "../../../util/auth/auth";
import { verifyIdToken } from "../../../util/auth/firebaseAdmin";
import firebaseClient from "../../../util/auth/firebaseClient";
import db from "../../../util/db";
import Map from "../../../components/Map";
import firebase from "firebase";

function Sight({ session }: any) {
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
  const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
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
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("home");
  const { locale, locales, defaultLocale } = router;
  const { userClaims }: any = useAuth();
  const [sight, setSight]: any = useState([]);

  useEffect(() => {
    (async () => {
      const sightData = await db
        .collection("sights")
        .doc(id as string)
        .get()
        .then(async (doc) => {
          await setSight(doc.data());
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  if (session) {
    if (
      userClaims != undefined &&
      userClaims.hasOwnProperty("admin") &&
      userClaims.admin
    ) {
      if (JSON.stringify(sight) != "[]") {
        return (
          <FlexContainer>
            <Head>
              <title>{sight.name} | SocGo!</title>
            </Head>
            <Metadata />
            <motion.div
              exit={{ opacity: 0 }}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={stagger}>
                <Stack direction={["column", "row"]} spacing={0}>
                  <Box w="100%" h="100vh" overflow="hidden">
                    <Stack h="100%">
                      <motion.div style={{ flex: 1 }} variants={fadeIn}>
                        <Box bg="brand.500" height="100%" width="100%">
                          <Map sight={sight} setSight={setSight} />
                        </Box>
                      </motion.div>
                    </Stack>
                  </Box>
                  <Box
                    borderLeft={["none", "1px solid rgba(127, 127, 127, 0.2)"]}
                    borderTop={["1px solid rgba(127, 127, 127, 0.2)", "none"]}
                    w={["100%", "600px"]}
                    h={["auto", "100vh"]}
                    overflow="auto"
                  >
                    <motion.div variants={fadeInUp}>
                      <Box p={6}>
                        <SightForm sight={sight} setSight={setSight} />
                      </Box>
                    </motion.div>
                  </Box>
                </Stack>
              </motion.div>
            </motion.div>
          </FlexContainer>
        );
      } else {
        return <Box></Box>;
      }
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
      </Center>;
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

export default Sight;
