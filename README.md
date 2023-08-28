<p align="center">
  <a href="https://arene.ca">
    <img alt="AR" src="./site/content/images/AR-logo.svg" width="60" />
  </a>
</p>

<h1 align="center">
  Alexandre René's personal website
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/ff229d34-ab08-45ba-8f48-ebc059a45f13/deploy-status)](https://app.netlify.com/sites/animated-crisp-804287/deploys)

Personal website, based on Wojciech Kocjan's [intro](https://github.com/wkocjan/gatsby-theme-intro) Gatsby template. This repo is the entire project, including both theme dependencies and the website itself. The file structure is that suggested by the [Gatsby starter workspace](https://github.com/gatsbyjs/gatsby-starter-theme-workspace).

## 🚀 Standard installation

If all you want is to use the theme as-is with your own content, there is no need to clone this repo. Just start a new site and install the theme as a dependency:

```shell
mkdir my-site
cd my-site
yarn init -2
yarn add gatsby react react-dom @arene/gatsby-theme-intro
```


## 🚀 Development installation

This is how I set up my development installation at the time of writing. It's a standard Gatsby structure for theme plugins, so if you already know your way around a Gatsby web site, you should be able to follow your usual procedure.

- Prerequisites (skip this if this is not your first Gatsby site)
  + Install Yarn. ([Official instructions](https://yarnpkg.com/getting-started/install/), [Super old instructions in Gatsby docs](https://www.gatsbyjs.com/docs/glossary/yarn/))  
    For the version, choose the one specified in `package.json`. (Or alternatively, change the version in `package.json` to match the yarn version.)
    * `corepack enable`
    * `corepack prepare yarn@<version> --activate`
  + Install Gatsby. (Either through Yarn following the Gatsby docs linked above, or through npm following [step 0 of the Gatsby tutorial](https://www.gatsbyjs.com/docs/tutorial/part-0/).)  
    Especially if you don't have other website projects, you don't need to specify `global`.
    * `yarn add gatsby-cli`

- Clone this project repo

  ```shell
  git clone https://github.com/alcrene/portfolio.git
  ```

- Optionally copy or hard link (symlinks don't work !) a local copy of *gatsby-theme-intro* at the location `portfolio/gatsby-theme-intro`.  
  NOTE: The [repository](https://github.com/wkocjan/gatsby-theme-intro) containing the `gatsby-theme-intro` theme is a worktree containing two workspaces: `gatsby-theme-intro/gatsby-theme-intro` is the actual Gatsby theme plugin, and `gatsby-theme-intro/site` is a blank website which uses it as a theme. You only want to copy the plugin into your own worktree.
  TODO: Change dependencies in *package.json* files so that this is actually optional.

- `cd portfolio` into the new website project.

- If it is not already there, add the following line to `.yamrc.yml`:

  ```
  nodeLinker: node-modules
  ```

  At the time of writing (Dec 2022), this was still required for Gatsby plugins to be found.

- Install with Yarn.

  ```shell
  yarn install
  ```

  + Depending on how you installed Yarn, it might be running the legacy v1; you need at least v2 for the build to work. To switch to the non-legacy version, use

    ```shell
    yarn set version berry
    ```

    then re-run the install command above.

- Launch the website locally for development

  ```shell
  yarn develop
  ```

**Hint**: If you have trouble getting Yarn to use your local dependencies, make sure you are not running the legacy yarn v1. Remember that if you delete the `.yarn` directory, you need to run `yarn set version berry` again.

## Deployment

Build & hosting services like Netlify will require that the `yarn.lock` does not change during a build. This can be tricky with workspaces. Currently I do the following:

- Run `yarn install` to update the content of the `yarn.lock`.
- Edit the `yarn.lock` file manually to remove:
  + Any entry resolving to a workspace (it should be duplicated with an entry resolving to an NPM version)
  + Package keys with multiple versions.
    * In this case, I edit the key to keep only the package that was resolved to.
    * Alternative, look at what the hosted build tool would have produced as a lockfile, and update `yarn.lock` accordingly.

## Updating content

All content is located under `site/content`. Add/update files to suit your needs.

## Layout

Customizations to the *intro* theme are in `gatsby-theme-intro-academic`.
This is a Gatsby theme, which itself depends on *@wkocjan/gatsby-theme-intro*.
The actual personal website is in `site`.

All of this is managed with [yarn workspaces](https://yarnpkg.com/features/workspaces/), which allows nested packages and gives them higher priority when installing within the workspace.

```text
.
├── gatsby-theme-intro (external)
│   └── <many files>
├── gatsby-theme-intro-academic
│   ├── README.md
│   ├── gatsby-config.js
│   ├── index.js
│   └── package.json
├── site
│   ├── README.md
│   ├── gatsby-config.js
│   ├── package.json
│   ├── src
│   │   └── pages
│   │       └── <single pages>
│   └── content
│       ├── images
│       │   ├── AR-logo.svg
│       │   ├── profile.jpg
│       │   └── <other images>
│       ├── profile.yaml
│       ├── projects.yaml
│       ├── social.yaml
│       └── work-history.yaml
├── README.md
├── .gitignore
├── package.json
└── yarn.lock

```

### `gatsby-theme-intro`

This is an [external dependency](https://github.com/alcrene/gatsby-theme-intro) which I include in the project if I need to make fixes which could eventually be pushed upstream.
Including it as a workspace avoids the need to reinstall everything for Gatsby to pick up changes.
(Workspaces are added as symlinks to `node_modules`.)

### `gatsby-theme-intro-academic`

The site's theme. It customizes *gatsby-theme-intro* (using [component shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/)), in particular to make it more suited to a academic portfolio.

Peer dependencies are the usual for a theme (*gatsby*, *react*, *react-dom*), plus *gatsby-theme-intro*.

### `site`

The actual personal website. It installs `gatsby-theme-intro` and `gatsby-theme-intro-academic` as dependencies, giving precedence to the latter.

- `site/`
  - `gatsby-config.js`: Specifies which theme to use and any other one-off config.
  - `src/`: Source code such as one-off pages or components that are too specific to include in the theme.
  - `content`: This is where the *gatsby-theme-intro* theme looks for the content.
    Each yaml file corresponds to a type in `gatsby-theme-intro/src/types`.

You can run the site locally with:

```shell
yarn develop
```

which is an alias for `yarn workspace site develop`.
To use the production builder, instead run:

```shell
yarn build
```

This takes longer to build, and does not rebuild and reload automatically when you make changes. (The longer build enables faster load times for visitors.) Since this is how your public site will ultimately be built, it is worth checking to make sure that the result is the same as expected from `yarn develop`.

To clear Gatsby's cache, run

```shell
yarn clean
```

This is a good thing to try if you have unexplainable errors after changing source files.

## Customization

Most customization (layout, colours) should be done in *gatsby-theme-intro-academic*, using component shadowing. The principle of component shadowing is relatively simple, but the details can be subtle. Some useful resources:

- [Overview](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) of the mechanism in the Gatsby docs.
- [In depth explanation](https://www.gatsbyjs.com/docs/conceptual/how-shadowing-works/) in the Gatsby docs.
- Remember that all shadowing files must be placed under `gatsby-theme-intro-academic/src/gatsby-theme-intro/`.  
  Ergo only files under `src` can be shadowed.
- Within a shadowing file, all relative imports must be replaced by module paths. E.g. something like `../../types` may become `gatsby-theme-intro/src/types`.
- Only files which already exist in *gatsby-theme-intro* may be shadowed. To add new files, simply add them to the file tree without the *gatsby-theme-intro* prefix.
- Don't forget to run `yarn clean` after adding/removing a shadowing file.

Theme styling uses [TailwindCSS](https://tailwindcss.com/). You can modify the Tailwind configuration (for example to change the [darkMode](https://tailwindcss.com/docs/dark-mode) option) by passing an object of options as the `tailwindConfig` options to the *gatsby-theme-intro* plugin in the file `gatsby-theme-intro-academic/gatsby-config.js`.

### Caveats regarding GraphQL queries

Even though they may be saved in the same file, GraphQL queries are not assembled with webpack and therefore cannot strictly be shadowed.[^shadow-page-queries] So for example, the file `gatsby-theme-intro/src/templates/index.js` contains the following

```jsx
import * as React from "react"
...

const IndexPage = ({ data, pageContext }) => {
  const { history, profile, projects, site, social } = data

  return (
    ...
  )
}

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        showThemeLogo
        formspreeEndpoint
      }
    }
    ...
  }
`
```

When we shadow this file in `gatsby-theme-intro-academic/src/gatsby-theme-intro/src/templates/index.jsx`, the contents of the `IndexPage` function get replaced, but the `IndexPageQuery` still gets added to GraphQL’s namespace.[^namespace] Because we can only have one query of any given name, we therefore need to rename the shadowed query, otherwise it will be ignored. So in the shadowed component we have:

```jsx
...
const IndexPage = ({ data, pageContext }) => {
  ...

export const query = graphql`
  query AcademicIndexPageQuery {
    site {
      siteMetadata {
        showThemeLogo
        formspreeEndpoint
      }
    }
    ...
  }
`
```

Now what happens is the following:
- During assembling, the `IndexPage` function from the `*-academic` theme is used.
- Both queries, `IndexPageQuery` and `AcademicIndexPageQuery` get added to the GraphQL namespace.
- The original file, `gatsby-theme-intro/src/templaces/index.js` is not at top level and therfore not longer a “page component” ([tut](https://www.gatsbyjs.com/docs/tutorial/part-2/#key-takeaways) | [docs](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/)). Since only page components can have page queries ([tut](https://www.gatsbyjs.com/docs/tutorial/part-4/) | [docs](https://www.gatsbyjs.com/docs/how-to/querying-data/)), the console reports the following warning:

  ```
  warn The GraphQL query in the non-page component "/home/alex/Websites/portfolio/gatsby-theme-intro/src/templates/index.js" will not be run.
  Exported queries are only executed for page components.
  ```

  This is fine, since it is in effect what we want: the original `IndexPageQuery` is not need, and also not being executed.

[^shadow-page-queries]: It appears this is something Gatsby would like to support, but at least in my testing it is not reliable. See [PR #17681](https://github.com/gatsbyjs/gatsby/pull/17681), but also this comment on [Issue #19980](https://github.com/gatsbyjs/gatsby/issues/19980#issuecomment-627440408), which explains differences between page queries and `StaticQuery`, and how this impacts shadowing. For a deeper discussion on why this happens, see [Issue #36920](https://github.com/gatsbyjs/gatsby/issues/36920).
[^namespace]: Or something along those lines. My mental model of GraphQL+Wepback is very approximate.

## Troubleshooting

- If the console reports an error like

  ```
  warn The GraphQL query in the non-page component
  "/path/to/portfolio/gatsby-theme-intro/src/templates/index.js" will not be run.
  ```
  
  the most likely explanation is that a javascript error is occurring inside the `createPages` step.
  (Within the call chain `gatsby-theme-intro/gatsby-node` -> `gatsby-theme-intro/src/gatsby/node/createPages.js`
  -> `gatsby-theme-intro/src/templates/index.js`.)  
  Possible reasons include a missing package or a failing query
  (to test if it is a query, try pasting the query in `index.js` into `http://localhost:8000/___graphql`
  and see if the result is as you would expect.)

  **Important** After fixing the issue, you need to run `yarn clean` to clear Gatsby's cache.
  Just stopping and starting the server is often not enough.