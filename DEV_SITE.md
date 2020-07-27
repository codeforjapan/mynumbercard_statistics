# DEVELOPMENT

## Web Site

The web site <http://mynumbercard.code4japan.org> is built by [gatsby.js](https://www.gatsbyjs.org/).
We use [gatsby-starter-typescript-plus](https://github.com/resir014/gatsby-starter-typescript-plus) for the bsse template.
The project source is located under the `site` directory.

## REQUIREMENT FOR WEBSITE DEVELOPMENT

- node version 12.18.2 (version 13 or later failed installing sharp in OSX 10.15.5.)

## SETUP

### install node 12.18.2

```bash
brew install nodenv # if you don't have any node version controller
nodenv install 12.18.2
```

### install dependencies

```bash
cd site
yarn install
```

### Run local dev site

```bash
gatsby develop
```

### build static files

```bash
yarn build
```

### Preview site

Commit to the `development` will update https://mynumbercard.netlify.app/ 
