import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../util/auth/auth";
import FlexContainer from "../components/FlexContainer";
import {
  Flex,
  Box,
  Button,
  Text,
  Heading,
  Stack,
  Image,
  useColorMode,
  Center,
  useToast,
  SimpleGrid,
  Container,
  Avatar,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { GitHub, Download, Book } from "react-feather";
import Head from "next/head";
import Metadata from "../components/Metadata";
import ScrollIndicator from "../components/ScrollIndicator";
import Dots from "../components/Dots";
import Footer from "../components/Footer";
import InstallGuide from "../components/InstallGuide";
import Header from "../components/Header";

export default function Home(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { t } = useTranslation("home");
  const { locale, locales, defaultLocale } = router;
  const toast = useToast();
  const { user }: any = useAuth();
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
  const fadeInRight = {
    initial: {
      x: -60,
      opacity: 0,
    },
    animate: {
      x: 0,
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
        duration: 1.2,
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
  return (
    <FlexContainer>
      <Head>
        <title>SocGo! | {t("common:head-title")}</title>
      </Head>
      <Metadata />
      <Header />
      <Alert status="warning" justifyContent="center">
        <AlertIcon />
        <Text>
          {t("covid-warning-safety")}{" "}
          <a
            href="https://www.iatatravelcentre.com/world.php"
            style={{ textDecoration: "underline" }}
            target="_blank"
          >
            {t("covid-warning-restrictions")}
          </a>
        </Text>
      </Alert>
      <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
        <motion.div variants={stagger}>
          <Center minH="calc(100vh - 49px)">
            <Flex>
              <Box p={8} my={12} mx="auto">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                  <Box maxW={500} m="auto">
                    <motion.div variants={fadeInUp}>
                      <Heading as="h1" size="2xl" mb={8}>
                        {t("landing-title")} 👋
                      </Heading>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Text fontSize="xl">{t("landing-subtitle")}</Text>
                    </motion.div>
                    <Stack isInline wrap="wrap">
                      <motion.div variants={fadeInUp}>
                        <Link href="/assets/socgo-1.0-hotfix-arm64-v8a.apk">
                          <Button
                            p={[2, 2, 2, 4]}
                            colorScheme="brand"
                            color="white"
                            mt="24px"
                          >
                            {t("landing-download-btn")}
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <Link href="https://github.com/electricas/socgo">
                          <Button
                            p={[2, 2, 2, 4]}
                            size="md"
                            mt="24px"
                            leftIcon={<GitHub />}
                          >
                            <a>GitHub</a>
                          </Button>
                        </Link>
                      </motion.div>
                    </Stack>
                  </Box>
                  <motion.div variants={fadeInUp}>
                    <Image
                      borderRadius={20}
                      border="5px solid rgba(127, 127, 127, 0.25)"
                      mx="auto"
                      src={
                        colorMode === "light"
                          ? "socgo-light.jpg"
                          : "socgo-dark.jpg"
                      }
                      alt="SocGo! Homepage Screenshot"
                      width={344}
                    />
                  </motion.div>
                </SimpleGrid>
              </Box>
            </Flex>
          </Center>
          <motion.div variants={fadeIn}>
            <ScrollIndicator />
          </motion.div>
        </motion.div>
        <Box mt="8rem">
          <motion.div variants={stagger}>
            <Container maxW="container.xl">
              <motion.div variants={fadeInRight}>
                <Box className="dots">
                  <Dots />
                </Box>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Center>
                  <Box position="relative" zIndex="2" my="5.3rem">
                    <Stack direction="column" spacing="1.5rem">
                      <Text textAlign="center" maxW="2xl" fontSize="xl">
                        "When fear tries to hide an experience from you, it
                        usually means that what you're looking for is right on
                        the other side."
                      </Text>
                      <Center>
                        <Stack direction="row" alignItems="center">
                          <Avatar
                            size="sm"
                            name="Yes Theory"
                            src="http://yt3.ggpht.com/ytc/AAUvwniUwJROZuvI7OrMLzfzbvJQSkOjZ9na-ipDFn-rYQ=s176-c-k-c0x00ffffff-no-rj-mo"
                          />
                          <Text>Yes Theory</Text>
                        </Stack>
                      </Center>
                    </Stack>
                  </Box>
                </Center>
              </motion.div>
            </Container>
          </motion.div>
        </Box>
      </motion.div>
      <Box mt="10rem">
        <InstallGuide />
      </Box>
      <Footer />
    </FlexContainer>
  );
}
