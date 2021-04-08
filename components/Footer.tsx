import {
  Box,
  Text,
  Container,
  Divider,
  Stack,
  useColorModeValue,
  Link,
  Heading,
  Image,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, locales, defaultLocale } = router;

  return (
    <>
      <Box marginTop="10rem" marginBottom="0.88rem" marginX={["1rem", "8rem"]}>
        <Stack spacing="2rem">
          <Image
            src="elec_logo.png"
            opacity="0.3"
            w="2rem"
            color="rgba(123,123,123,0.5)"
            alt="Robin Řepka logo"
            mb="3rem"
          />
          <Box w={["100%", "35%"]}>
            <Image
              src="me.jpg"
              boxSize="50px"
              borderRadius="full"
              mb="1rem"
              alt="Robin Řepka"
            />
            <Text fontSize="sm" color="rgba(123,123,123,0.5)">
              {t("footer-personal")}
            </Text>
          </Box>
          <Box>
            <Divider marginBottom="0.75rem" />
            <Stack direction={["column", "row"]} justify="space-between">
              <Text
                fontSize="xs"
                color={useColorModeValue("#b3b3b3", "#51535c")}
                isTruncated
              >
                {t("footer-subtitle")}
              </Text>
              <Text
                fontSize="xs"
                color={useColorModeValue("#b3b3b3", "#51535c")}
                isTruncated
              >
                <Link href="/" _focus={{ outline: 0 }}>
                  {t("footer-tos")}
                </Link>{" "}
                •{" "}
                <Link href="/" _focus={{ outline: 0 }}>
                  {t("footer-privacy")}
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
