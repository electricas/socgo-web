import React from "react";
import Link from "next/link";
import { useAuth } from "./../auth";
import Container from "./../components/Container";
import { Flex, Box, Button, Text, Heading, Stack } from "@chakra-ui/react";
import Header from "./../components/Header";

export default function Home() {
  return (
    <Container>
      <Header />
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" mb={12} textAlign="center">
            Hey!
          </Heading>
          <Stack
            mt={8}
            alignItems="center"
            justifyContent="center"
            isInline
            width="100%"
          ></Stack>
        </Box>
      </Flex>
    </Container>
  );
}
