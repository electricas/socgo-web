module.exports = {
    locales: ['gb', 'cz', 'kr'],
    defaultLocale: 'gb',
    pages: {
      '*': ['common'],
      '/': ['home'],
      '/authenticated': ['common'],
      '/login': ['login'],
    },
    localeMap: [
      {countryCode: "gb", displayName: "English (UK)"},
      {countryCode: "cz", displayName: "Čeština"},
      {countryCode: "kr", displayName: "한국어"},
    ],
    loadLocaleFrom: (locale, namespace) =>
      import(`./locales/${namespace}_${locale}`).then((m) => m.default),
  }