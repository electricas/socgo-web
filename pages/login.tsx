import React, { useState } from "react";
import firebaseClient from "../util/auth/firebaseClient";
import firebase from "firebase/app";
import admin from "firebase-admin";
import "firebase/auth";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Button,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
  Image,
} from "@chakra-ui/react";
import { Google } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff } from "react-feather";
import FlexContainer from "../components/FlexContainer";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import Head from "next/head";
import Metadata from "../components/Metadata";
import db from "../util/db";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation("login");
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
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow]: any = useState("");
  const [loginDisabled, setLoginDisabled]: any = useState("");
  const [gLoginDisabled, setGLoginDisabled]: any = useState("");
  const handleLoginDisabled = (status: boolean) => setLoginDisabled(status);
  const handleGLoginDisabled = (status: boolean) => setGLoginDisabled(status);
  const handlePassShowClick = () => setShow(!show);
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  provider.addScope("openid");

  return (
    <FlexContainer>
      <Head>
        <title>SocGo! | {t("common:head-title")}</title>
      </Head>
      <Metadata />
      <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
        <Stack direction={["column", "row"]} spacing={0}>
          <Box w={["100%", "60%"]} h={["200px", "100vh"]} overflow="hidden">
            <motion.div variants={fadeIn}>
              <Image
                src="login.jpg"
                alt="City buildings sign in background"
                h={["200px", "100%"]}
                w={["100%", "auto"]}
                objectFit="cover"
              />
            </motion.div>
          </Box>
          <Box w={["100%", "40%"]} h={["auto", "100vh"]} overflow="auto">
            <Flex h="100%" justifyContent="center" alignItems="center">
              <motion.div variants={fadeInUp}>
                <Box w={500} p={4} my={12}>
                  <Alert status="warning" mb={8} borderRadius={5}>
                    <AlertIcon />
                    {t("login-admin-alert")}
                  </Alert>
                  <FormControl isRequired>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="emailAddress"
                      value={email}
                      focusBorderColor="brand.500"
                      variant="filled"
                      placeholder={t("login-email-placeholder")}
                      aria-describedby="email-helper-text"
                    ></Input>
                  </FormControl>
                  <FormControl mt={2} isRequired>
                    <InputGroup>
                      <Input
                        onChange={(e) => setPass(e.target.value)}
                        type={show ? "text" : "password"}
                        id="pass"
                        value={pass}
                        focusBorderColor="brand.500"
                        variant="filled"
                        placeholder={t("login-password-placeholder")}
                        aria-describedby="password-helper-text"
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          aria-label="Show/Hide password"
                          onClick={handlePassShowClick}
                          icon={show ? <EyeOff /> : <Eye />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    variant="ghost"
                    colorScheme="brand"
                    mt={4}
                    isDisabled={email === ""}
                    onClick={async () => {
                      await firebase
                        .auth()
                        .sendPasswordResetEmail(email)
                        .then(() => {
                          toast({
                            title: "Success",
                            description:
                              "A password reset email has been sent.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          });
                          setEmail("");
                          setPass("");
                        })
                        .catch((err) => {
                          const message = err.message;
                          toast({
                            title: "An error occured",
                            description: message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        });
                    }}
                  >
                    {t("login-forgot-password-btn")}
                  </Button>
                  <Button
                    width="100%"
                    variant="solid"
                    isLoading={gLoginDisabled}
                    isDisabled={gLoginDisabled || loginDisabled}
                    mt={4}
                    leftIcon={<Google />}
                    onClick={async () => {
                      handleGLoginDisabled(true);
                      await firebase
                        .auth()
                        .signInWithPopup(provider)
                        .then(async () => {
                          handleGLoginDisabled(false);
                          setAdminClaims();
                          router.push("/");
                        })
                        .catch((err) => {
                          const errCode = err.code;
                          const errMessage = err.message;
                          toast({
                            title: "An error occured",
                            description: errMessage,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                          handleLoginDisabled(false);
                        });
                    }}
                  >
                    {t("login-signin-google-btn")}
                  </Button>
                  <Stack justify="flex-end" mt={8} isInline spacing={10}>
                    <Button
                      variant="solid"
                      colorScheme="brand"
                      color="white"
                      isLoading={loginDisabled}
                      isDisabled={
                        email === "" ||
                        pass === "" ||
                        loginDisabled ||
                        gLoginDisabled
                      }
                      onClick={async () => {
                        handleLoginDisabled(true);
                        await firebase
                          .auth()
                          .signInWithEmailAndPassword(email.trim(), pass.trim())
                          .then(async () => {
                            handleLoginDisabled(false);
                            setAdminClaims();
                            router.push("/");
                          })
                          .catch((err) => {
                            const message = err.message;
                            toast({
                              title: "An error occured",
                              description: message,
                              status: "error",
                              duration: 9000,
                              isClosable: true,
                            });
                            handleLoginDisabled(false);
                          });
                      }}
                    >
                      {t("login-signin-btn")}
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            </Flex>
          </Box>
        </Stack>
      </motion.div>
    </FlexContainer>
  );
}

const setAdminClaims = async () => {
  const doc = await db
    .collection("users")
    .doc(firebase?.auth()?.currentUser?.uid)
    .get();
  if (!doc.exists) {
    firebase?.auth()?.signOut();
  } else {
    if (doc.data()?.admin) {
      await axios.post(`/api/user/${doc.data()?.id}/setadmin`, {
        uid: doc.data()?.id,
      });
    }
  }
};
