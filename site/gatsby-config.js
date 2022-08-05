const siteUrl = 'https://mynumbercard.code4japan.org'
module.exports = {
  siteMetadata: {
    title: 'マイナンバーカード普及状況ダッシュボード',
    description: 'マイナンバーカードの普及状況をダッシュボード形式で表示するサイトです。CSVデータもダウンロードできます。',
    keywords: 'マイナンバーカード, 普及率, オープンデータ',
    siteUrl: siteUrl,
    type: 'website',
    siteName: 'マイナンバーカード普及状況ダッシュボード',
    author: {
      name: 'Code for Japan',
      url: 'https://code4japan.org/',
      email: 'info0code4japan.org'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/../data/out`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      /**
       * convert markdown to html
       */
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [{
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
              showCaptions: true
            }
          }
        ]
      }
    },
    {
      /**
       * plugin for providing /feed-1.json.
       */
      resolve: `gatsby-plugin-json-output`,
      options: {
        siteUrl: siteUrl, // defined on top of plugins
        // get all files grouped by file name
        graphQLQuery: `
          {
            allFile(filter: {base: {regex: "/.csv$/"}}) {
              group(field: base) {
                fieldValue
                edges {
                  node {
                    base
                    fields {
                      dir
                      href
                    }
                  }
                }
              }
            }
          }
        `,
        // this method will create feed-1.json
        serializeFeed: results => {
          {
            return results.data.allFile.group.map(group => {
              return {
                name: group.fieldValue,
                files: group.edges.map(edge => {
                  return {
                    dir: edge.node.fields.dir,
                    href: edge.node.fields.href
                  }
                })
              }
            })
          }
        },
        nodesPerFeedFile: 300
      }
    }, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-45275834-10',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet'
  ],
}
