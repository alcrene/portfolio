module.exports = {
  siteMetadata: {
    description: "Personal page of Alexandre René",
    title: "Alexandre René",
    formspreeEndpoint: "https://formspree.io/f/{your-id}"
  },
  plugins: [
    {
      resolve: "@arene/gatsby-theme-intro-academic",
      options: {
        basePath: "/",
        contentPath: "content/",
        theme: "classic",
        darktheme: "dark-blue",
        lang: "en",
      }
    }
  ]
}
