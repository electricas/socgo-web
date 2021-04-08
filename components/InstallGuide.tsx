import React from "react";

import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import { Download, Settings, UserPlus, Map } from "react-feather";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function InstallGuide() {
  const router = useRouter();
  const { t } = useTranslation("home");
  const { locale, locales, defaultLocale } = router;

  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={[1, 2]} spacing="20px">
        <Box
          display="flex"
          width="100%"
          height="300px"
          justifyContent="flex-end"
        >
          <Stack alignItems="flex-end">
            <Box
              display="flex"
              bg="brand.700"
              borderRadius="xl"
              height="3.5rem"
              width="3.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Download size="2rem" color="#E0153B" />
            </Box>
            <Heading>{t("landing-install-download-title")}</Heading>
            <Text textAlign="end">
              {t("landing-install-download-subtitle")}
            </Text>
          </Stack>
        </Box>
        <Box display="flex" width="0px" height="300px"></Box>
        <Box display="flex" width="0px" height="300px"></Box>
        <Box display="flex" width="100%" height="300px">
          <Stack>
            <Box
              display="flex"
              bg="brand.700"
              borderRadius="xl"
              height="3.5rem"
              width="3.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Settings size="2rem" color="#E0153B" />
            </Box>
            <Heading>{t("landing-install-install-title")}</Heading>
            <Text>{t("landing-install-install-subtitle")}</Text>
          </Stack>
        </Box>
        <Box
          display="flex"
          width="100%"
          height="300px"
          justifyContent="flex-end"
        >
          <Stack alignItems="flex-end">
            <Box
              display="flex"
              bg="brand.700"
              borderRadius="xl"
              height="3.5rem"
              width="3.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <UserPlus size="2rem" color="#E0153B" />
            </Box>
            <Heading>{t("landing-install-signup-title")}</Heading>
            <Text textAlign="end">{t("landing-install-signup-subtitle")}</Text>
          </Stack>
        </Box>
        <Box display="flex" width="0px" height="300px"></Box>
        <Box display="flex" width="0px" height="300px"></Box>
        <Box display="flex" width="100%" height="300px">
          <Stack>
            <Box
              display="flex"
              bg="brand.700"
              borderRadius="xl"
              height="3.5rem"
              width="3.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Map size="2rem" color="#E0153B" />
            </Box>
            <Heading>{t("landing-install-travel-title")}</Heading>
            <Text>{t("landing-install-travel-subtitle")}</Text>
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
