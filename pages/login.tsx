import React, { useState } from "react";
import firebaseClient from "./../firebaseClient";
import firebase from "firebase/app";
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
} from "@chakra-ui/react";
import { Google } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff } from "react-feather";
import Container from "../components/Container";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  firebaseClient();
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
    <Container>
      <Header />
      <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
        <Flex>
          <Box w={500} p={4} my={12} mx="auto">
            <Alert status="warning" mb={8} borderRadius={5}>
              <AlertIcon />
              You're logging into the admin panel. If you do not have an admin
              account, leave this website.
            </Alert>
            <FormControl isRequired>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="emailAddress"
                value={email}
                variant="filled"
                placeholder="Email Address"
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
                  variant="filled"
                  placeholder="Password"
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
              colorScheme="blue"
              mt={4}
              isDisabled={email === ""}
              onClick={async () => {
                await firebase
                  .auth()
                  .sendPasswordResetEmail(email)
                  .then(() => {
                    toast({
                      title: "Success",
                      description: "A password reset email has been sent.",
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
              Forgot password?
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
                  .then((result) => {
                    var user = result.user;
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
                    handleGLoginDisabled(false);
                  });
              }}
            >
              Continue with Google
            </Button>
            <Stack justify="flex-end" mt={8} isInline spacing={10}>
              <Button
                variant="solid"
                colorScheme="blue"
                isLoading={loginDisabled}
                isDisabled={
                  email === "" || pass === "" || loginDisabled || gLoginDisabled
                }
                onClick={async () => {
                  handleLoginDisabled(true);
                  await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.trim(), pass.trim())
                    .then(() => {
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
                Sign in
              </Button>
            </Stack>
          </Box>
        </Flex>
      </motion.div>
    </Container>
  );
}
