import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        type
        siteName
      }
    }
    file(relativePath: { eq: "ogp.png" }) {
      childImageSharp {
        resize(width: 1200) {
          src
        }
      }
    }
  }
`
interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
      siteUrl: string
      type: string
      siteName: string
    }
  }
  file: {
    childImageSharp: {
      resize: {
        src: string
      }
    }
  }
}

export const useMeta = () => {
  const {
    site: { siteMetadata },
    file
  }: StaticQueryProps = useStaticQuery(query)
  return {
    siteMetadata,
    file
  }
}
