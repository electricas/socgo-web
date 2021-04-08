import Head from "next/head";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Metadata() {
  const router = useRouter();
  const { t } = useTranslation("metadata");
  const { locale, locales, defaultLocale } = router;
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content="SocGo!" />
      <meta name="description" content={t("description")} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://socgo.franticc.co.uk/" />
      <meta property="og:title" content="SocGo!" />
      <meta property="og:description" content={t("description")} />
      <meta property="og:image" content="" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://socgo.franticc.co.uk/" />
      <meta property="twitter:title" content="SocGo!" />
      <meta property="twitter:description" content={t("description")} />
      <meta property="twitter:image" content="" />
    </Head>
  );
}
