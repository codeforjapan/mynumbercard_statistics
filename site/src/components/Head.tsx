import * as React from 'react'
import Helmet from 'react-helmet'
import { useLocation } from '@reach/router'
import { MenuLInks } from '../components/Header'
import { useMeta } from '../hooks'

const Head: React.FC = () => {
  const { siteMetadata, file } = useMeta()
  const { pathname } = useLocation()
  const pageTitle = MenuLInks.find(m => m.page === pathname)?.text
  const siteTitle = React.useMemo(() => (pageTitle ? `${pageTitle} - ${siteMetadata.title}` : siteMetadata.title), [
    pageTitle,
    siteMetadata.title
  ])
  return (
      <Helmet
        title={siteTitle}
        meta={[
          { name: 'description', content: siteMetadata.description },
          { name: 'keywords', content: siteMetadata.keywords },
          { property: 'og:title', content: siteTitle },
          { property: 'og:description', content: siteMetadata.description },
          { property: 'og:url', content: siteMetadata.siteUrl + pathname },
          { property: 'og:type', content: siteMetadata.type },
          { property: 'og:site_name', content: siteMetadata.siteName },
          { property: 'og:image', content: siteMetadata.siteUrl + file.childImageSharp.resize.src },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '896' }
        ]}
      >
      <link rel="icon" href="/images/favicon.ico" />
    </Helmet>
  )
}

export default Head;
