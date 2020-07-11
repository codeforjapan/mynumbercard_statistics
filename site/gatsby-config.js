'use strict'

module.exports = {
  siteMetadata: {
    title: 'マイナンバーカード普及状況ダッシュボード',
    description: 'マイナンバーカードノ普及状況をダッシュボード形式で表示するサイトです。',
    keywords: 'マイナンバーカード, 普及率, オープンデータ',
    siteUrl: 'https://mynumbercard.code4japan.org',
    author: {
      name: 'Code for Japan',
      url: 'https://code4japan.org/',
      email: 'info0code4japan.org'
    }
  },
  plugins: [{
      resolve: 'gatsby-source-filesystem',
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
        path: `${__dirname}/src/content`,
      }
    },
    {
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
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
