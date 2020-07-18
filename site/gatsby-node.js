"use strict";
/*jshint node: true */
/*jshint esversion: 8 */
const fs = require('fs'); // jshint ignore:line

const path = require('path') // jshint ignore:line
const {
  createFilePath
} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'Directory': {
      if (node.sourceInstanceName == 'data' && node.relativePath != '') {
        createNodeField({
          node,
          name: 'slug',
          value: `data/${node.name}`
        });
      }
      break;
    }
    case 'File': {
      if (node.relativeDirectory != '' &&
        node.internal.mediaType == 'text/csv') {
        // copy csv files to static folder
        const slug = createFilePath({
          node,
          getNode,
          basePath: `data/`
        });
        createNodeField({
          node,
          name: 'slug',
          value: `data/${node.relativeDirectory}`
        });
        // make data dir is it does not exitst
        const outdir = './public/static/data';
        try {
          fs.mkdirSync(outdir);
        } catch (err) {

        }
        try {
          fs.mkdirSync(`${outdir}/${node.relativeDirectory}`);
        } catch (err) {

        }
        const outfile = `${outdir}/${node.relativeDirectory}/${node.base}`;
        fs.copyFileSync(node.absolutePath, outfile);
        // set new path to href field
        createNodeField({
          node,
          name: 'href',
          value: `/static/data/${node.relativeDirectory}/${node.base}`
        });
      }
      break;
    }
    case 'MarkdownRemark': {
      const {
        permalink,
        layout
      } = node.frontmatter;
      const {
        relativePath
      } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      });
    }
  }
};

exports.createPages = async ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions;
  const dirNodes = await graphql(`
    {
      allDirectory(filter: { relativePath: { ne: "" } }) {
        edges {
          node {
            relativePath
            name
            root
            parent {
              id
            }
            dir
            base
            internal {
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (dirNodes.errors) {
    console.error(dirNodes.errors);
    throw new Error(dirNodes.errors);
  }
  dirNodes.data.allDirectory.edges.forEach(({
    node
  }) => {
    const {
      slug
    } = node.fields;
    createPage({
      path: slug,
      component: path.resolve('./src/templates/datadir.tsx'),
      context: {
        slug
      }
    });
  });
  /*
  // create file node
  const fileNodes = await graphql(`
    {
      allFile(filter: {relativeDirectory: {ne: ""}, base: {regex: "/.csv$/"}}) {
        edges {
          node {
            relativePath
            relativeDirectory
            name
            base
          }
        }
      }
    }
  `);
  if (fileNodes.errors) {
    console.error(fileNodes.errors);
    throw new Error(fileNodes.errors);
  }
  fileNodes.data.allFile.edges.forEach(({
    node
  }) => {
    const relativeDirectory = node.relativeDirectory;
    createPage({
      path: relativeDirectory,
      component: path.resolve('./src/templates/datadir.tsx'),
    });
  });
  */
  /*
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug
      }
    })
  })
  */
};
