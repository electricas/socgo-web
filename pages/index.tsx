import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "./../auth";
import Container from "./../components/Container";
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
  ButtonGroup,
} from "@chakra-ui/react";
import Header from "./../components/Header";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { GitHub, Download, Book } from "react-feather";

export default function Home(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { t } = useTranslation("home");
  const { locale, locales, defaultLocale } = router;
  const toast = useToast();
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
  return (
    <Container>
      <Header />
      <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
        <Center minH="90vh">
          <Flex>
            <Box p={8} my={12} mx="auto">
              <motion.div variants={stagger}>
                <Stack
                  isInline
                  wrap="wrap"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box maxW={500}>
                    <motion.div variants={fadeInUp}>
                      <Heading mb={4}>{t("landing-title")}</Heading>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Text fontSize="xl">{t("landing-subtitle")}</Text>
                    </motion.div>
                    <Stack isInline>
                      <motion.div variants={fadeInUp}>
                        <Button
                          size="md"
                          colorScheme="brand"
                          color="white"
                          mt="24px"
                          onClick={() => {
                            toast({
                              title: "App not yet available",
                              description:
                                "The app is not available yet for global use.",
                              status: "warning",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        >
                          {t("landing-download-btn")}
                        </Button>
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <Button size="md" mt="24px" leftIcon={<Book />}>
                          {t("landing-docs-btn")}
                        </Button>
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <Link href="https://github.com/electricas/socgo">
                          <Button size="md" mt="24px" leftIcon={<GitHub />}>
                            <a>GitHub</a>
                          </Button>
                        </Link>
                      </motion.div>
                    </Stack>
                  </Box>
                  <motion.div variants={fadeInUp}>
                    <Image
                      sx={{
                        "@media screen and (min-width: 768px)": {
                          marginLeft: 20,
                        },
                        "@media screen and (max-width: 767px) and (orientation: portrait)": {
                          marginTop: 10,
                        },
                      }}
                      src={
                        colorMode === "light"
                          ? "socgo-light.png"
                          : "socgo-dark.png"
                      }
                      width={334}
                    />
                  </motion.div>
                </Stack>
              </motion.div>
            </Box>
          </Flex>
        </Center>
      </motion.div>
    </Container>
  );
}
