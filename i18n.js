module.exports = {
    locales: ['en-GB', 'cs-CZ', 'pt-BR', 'ko-KR'],
    defaultLocale: 'en-GB',
    pages: {
      '*': ['common', 'utility', 'metadata'],
      '/': ['home'],
      '/dashboard': ['common'],
      '/login': ['login'],
    },
    localeMap: [
      {countryCode: "en-GB", displayName: "English (UK)"},
      {countryCode: "cs-CZ", displayName: "Čeština"},
      {countryCode: "pt-BR", displayName: "Português brasileiro"},
      {countryCode: "ko-KR", displayName: "한국어"},
    ],
    loadLocaleFrom: (locale, namespace) =>
      import(`./locales/${namespace}_${locale}`).then((m) => m.default),
  }