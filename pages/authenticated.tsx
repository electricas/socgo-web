import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "./../firebaseAdmin";
import firebaseClient from "./../firebaseClient";
import firebase from "firebase/app";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Container from "../components/Container";
import { useRouter } from "next/router";

function Authenticated({ session }: any) {
  firebaseClient();
  const router = useRouter();
  if (session) {
    return (
      <Container>
        <Header />
        <Flex>
          <Box w={500} p={4} my={12} mx="auto">
            <Heading as="h2" mb={12} textAlign="center">
              Authenticated
            </Heading>
            <Text textAlign="center">{session}</Text>
          </Box>
          <Box w={500} p={4} my={12} mx="auto">
            <Button
              width="100%"
              variant="solid"
              colorScheme="red"
              onClick={async () => {
                await firebase.auth().signOut();
                router.push("/");
              }}
            >
              Sign out
            </Button>
          </Box>
        </Flex>
      </Container>
    );
  } else {
    return (
      <Box>
        <Text>Loading</Text>
      </Box>
    );
  }
}

export async function getServerSideProps(context: any) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        session: `${email}, ${uid}`,
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return { props: [] };
  }
}

export default Authenticated;
