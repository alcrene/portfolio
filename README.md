<p align="center">
  <a href="https://arene.ca">
    <img alt="AR" src="./site/content/images/AR-logo.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Alexandre René's personal website
</h1>

Personal website, based on Wojciech Kocjan's [intro](https://github.com/wkocjan/gatsby-theme-intro) Gatsby template. This repo is the entire project, including both theme dependencies and the website itself. The file structure is that suggested by the [Gatsby starter workspace](https://github.com/gatsbyjs/gatsby-starter-theme-workspace).

## Installation

### Prerequisites

Skip any instruction for packages you already have installed (e.g. if this is not your first website).

- Install Node.js ⩾ 16.10. ([Official instructions](https://nodejs.dev/en/learn/how-to-install-nodejs/))
  + It used to be more important to be able to pin the Node version to match your host, but in many cases now using a single system-wide version provided by your package manager should suffice. 
- Install Yarn. ([Official instructions](https://yarnpkg.com/getting-started/install/), [Super old instructions in Gatsby docs](https://www.gatsbyjs.com/docs/glossary/yarn/))  
  + `corepack enable`
  + `corepack prepare yarn@<version> --activate`
     For the version, choose either the [latest one](https://github.com/yarnpkg/berry/releases/latest) or the one specified in `package.json`. Especially if this is your only web project, the exact version does not matter too much.
- Optional: Install Gatsby globally. ([Gatsby docs](https://www.gatsbyjs.com/docs/glossary/yarn/#using-yarn-to-install-gatsby))
  + This is useful mostly if you expect to create or maintain many websites, and want to use commants like `gatsby new`. Since I only maintain this one website, I normally skip this step.
  + `yarn global add gatsby-cli`

### Standard installation

Use this if you are happy with the theme’s look, and just want to create a new website with your own content.
These are same instructions as those documented with the [theme](https://github.com/alcrene/gatsby-theme-intro-academic).

- Create a new, blank website

  ```shell
  mkdir my-site
  cd my-site
  yarn init -2
  yarn add gatsby react react-dom @arene/gatsby-theme-intro-academic
  ```

- Copy the folder `site/contents` from <https://github.com/alcrene/gatsby-theme-intro-academic.git> into your site, so that the directory structure now looks like this:

  ```text
  my-site
  └── content
     ├── images
     ├── academic-history.yaml
     ├── papers.yaml
     ├── profile.yaml
     ├── projects.yaml
     └── social.yaml
  ```

  (Normally the `gatsby-theme-intro-academic` theme would automatically create the `content` directory on the first run, but a bug currently causes it to do so with the contents for the base theme, rather than the `-academic` variant.)

- Launch the website locally by changing to the `portfolio` directory and running

  ```shell
  yarn develop
  ```

  Open the provided URL in a browser window.

- Go through all the files in `portfolio/content` and update them your own information.  
  Notice that your browser updates within a few seconds of files being saved.


### 🚀 Development installation

This is how I set up my development installation at the time of writing; us this if you intend to make modifications to the theme. It's [the officially recommended structure](https://www.gatsbyjs.com/tutorial/building-a-theme) for developing Gatsby themes plugins, with some changes based on the assumption that your primary goal is creating your personal website (vs. publishing a new theme). If you are not familiar with using yarn workspaces to manage theme dependencies, highly recommended to read through that tutorial up to when they run an empty site.

- Clone this project repo

  ```shell
  git clone https://github.com/alcrene/portfolio.git
  ```

- Clone the theme repos [*gatsby-theme-intro*](https://github.com/alcrene/gatsby-theme-intro) and [*gatsby-theme-intro-academic*](https://github.com/alcrene/gatsby-theme-intro-academic) into this directory. (The `.gitignore` is configured to ignore those locations, at the location `portfolio/gatsby-theme-intro`.)  
  + This places them as nested *worktrees* within this *project*. (*Worktrees* are *workspaces* which contain their own workspaces.)
  + Alternatively, if you don't plan on modifying the themes, you can remove their workspaces from `package.json`.

- `cd portfolio` into the new website project.

- A workspace can only contain one `.yarnrc.yml`, so remove those from the nested theme repos:  
  
  ```
  rm gatsby-theme-intro/.yarnrc.yml
  rm gatsby-theme-intro-academic/.yarnrc.yml
  ```

  Those files however are needed in their original repos. To allow pushing updates without accidentally deleting them  (and to avoid git warning about uncommitted changes), [`update the index with --skip-wortree`]:

  ```
  git update-index --skip-worktree gatsby-theme-intro/.yarnrc.yml
  git update-index --skip-worktree gatsby-theme-intro-academic/.yarnrc.yml
  ```

- Now install the whole workspace with Yarn:

  ```shell
  yarn install
  ```

  + If you cloned the repo, you should already have a `.yarnrc.yml` file, which will tell yarn to use version 3. Without this file yarn will use its legacy v1, and the installation will fail. If that happens, execute

    ```shell
    yarn set version berry
    ```

    then re-run the install command above.

- Launch the website locally for development

  ```shell
  yarn develop
  ```

**Hint**: If you have trouble getting Yarn to use your local dependencies, make sure you are not running the legacy yarn v1. Remember that if you delete the `.yarn` directory, you need to run `yarn set version berry` again.

### Compatibility with Plug’n’Play

At present the themes are not compatible with [Plug’n’Play](https://yarnpkg.com/features/pnp/). This is why the `.yamrc.yml` contains the line

```
nodeLinker: node-modules
```

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

Some noteworthy contents:

- `src/templates`:
  + Overall page layout.
  + Definition of the big global for *profile*, *social*, *history*, *projects* and *papers*. Queried data are passed as arguments to the components.
- `src/components`: Individual page elements
- `src/types`: Component arguments are defined by [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) in this directory.
- `src/themes`: Color variants
- `src/gatsby/node/createSchema.js`: What creates the GraphQL schema. Keep in sync with `src/types`.
  + Note that the files in `src/gatsby` are executed directly by the theme’s `gatsby-node.js` and cannot be shadowed. However you can create your own files and execute them with your own `gatsby-node.js`. (This is how `gatsby-theme-intro-academic` updates the GraphQL schemas.)

### `gatsby-theme-intro-academic`

The site's theme; also an [external dependency](https://github.com/alcrene/gatsby-theme-intro-academic). It customizes *gatsby-theme-intro* (using [component shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/)), in particular to make it more suited to a academic portfolio.

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
- Remember that all shadowing files must be placed under `gatsby-theme-intro-academic/src/@arene/gatsby-theme-intro/`.  
  Ergo only files under `src` can be shadowed.
- Within a shadowing file, all relative imports must be replaced by module paths. E.g. something like `../../types` may become `gatsby-theme-intro/src/types`.
- Only files which already exist in *gatsby-theme-intro* may be shadowed. To add new files, simply add them to the file tree without the *gatsby-theme-intro* prefix.
- Don't forget to run `yarn clean` after adding/removing a shadowing file.

Theme styling uses [TailwindCSS](https://tailwindcss.com/). You can modify the Tailwind configuration (for example to change the [darkMode](https://tailwindcss.com/docs/dark-mode) option) by passing an object of options as the `tailwindConfig` options to the *gatsby-theme-intro* plugin in the file `gatsby-theme-intro-academic/gatsby-config.js`.

**Important** In order to use TailwindCSS classes in your new files, they must be be listed in the the `content` field of `tailwindConfig`, as in the [example above](#dark-mode).

### Variant colors

Color variants are defined in `src/themes`. They define the following colors:

- `back`
- `front`
- `lead`
- `lead-text`
- `line`
- `skill-1`
- `skill-2`
- `skill-3`

In addition, the color

- `back-light`

is defined dynamically in `tailwind.config.js`, by lightening the color `back`.

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
- The original file, `gatsby-theme-intro/src/templaces/index.js` is no at top level and therfore no longer a “page component” ([tut](https://www.gatsbyjs.com/docs/tutorial/part-2/#key-takeaways) | [docs](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/)). Since only page components can have page queries ([tut](https://www.gatsbyjs.com/docs/tutorial/part-4/) | [docs](https://www.gatsbyjs.com/docs/how-to/querying-data/)), the console reports the following warning:

  ```
  warn The GraphQL query in the non-page component "/home/alex/Websites/portfolio/gatsby-theme-intro/src/templates/index.js" will not be run.
  Exported queries are only executed for page components.
  ```

  This is fine, since it is in effect what we want: the original `IndexPageQuery` is not need, and also not being executed.

[^shadow-page-queries]: It appears this is something Gatsby would like to support, but at least in my testing it is not reliable. See [PR #17681](https://github.com/gatsbyjs/gatsby/pull/17681), but also this comment on [Issue #19980](https://github.com/gatsbyjs/gatsby/issues/19980#issuecomment-627440408), which explains differences between page queries and `StaticQuery`, and how this impacts shadowing. For a deeper discussion on why this happens, see [Issue #36920](https://github.com/gatsbyjs/gatsby/issues/36920).
[^namespace]: Or something along those lines. My mental model of GraphQL+Wepback is very approximate.

## Updating dependencies

- Running `yarn upgrade-interactive` will check for any out-of-data packages, and propose to update them. It automatically updates the version ranges in `package.json` files.

## Pushing updates upstream

### Pushing to the repo

If you’ve committed changes to the theme, and want to push them upstream, in theory it suffices to do the usual `git push`. The caveat is if the repo contains a `yarn.lock` file, since it is not updated when you do `yarn install` from the root directory (only the lock file in the root workspace is updated).  Pushing an incorrect lock file is worse than pushing no lock file at all, so you have two options:[^individual-lockfiles]

- Copy the root’s `yarn.lock` into sub workspace and run `yarn install` from within that workspace. As suggested [here](https://github.com/yarnpkg/berry/issues/1223#issuecomment-617213530), this will prune the lock file, but will not change package versions. Note that this is a bit more tricky for a package like `gatsby-theme-intro-academic`, which depends on another package in the workspace.
  + **Important** This will create `.yarn/cache`, `.yarn/install-state.gz` and `node_modules` directories in the sub workspace. *These need to be removed*, otherwise `yarn develop` will fail in all other workspaces. See [Troubleshooting](#troubleshooting) below.
- Stop tracking the lock file. Since it mostly useful for debugging, this is not that unreasonable.

At present we use the first approach for `gatsby-theme-intro`, and the second approach for `gatsby-theme-intro-academic`.

[^individual-lockfiles]: Unfortunately as of this writing it is not possible to maintain multiple lockfiles within the same yarn workspace: [yarnpkg issue#1223](https://github.com/yarnpkg/berry/issues/1223).

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


- If the console reports weird GraphQL errors, that don’t seem to relate to anything specific to your site, this may be due to having multiple instances of the `graphql` module running. This is not so difficult to do by accident when working with workspaces. An example of such an error is
  
  ```text
  Missing onError handler for invocation 'building-schema', error was 'Error: Cannot create as TypeComposer the following value:
  ```

  If this happens, make sure that only the root directory contains `.yarn/cache`, `.yarn/install-state.gz` and `node_modules`; if any of the sub workspaces contain these, delete them. (The most likely cause for accidentally creating them is running `yarn install` in a directory containing a `yarn.lock`.)
