import * as React from 'react'
import Helmet from 'react-helmet'
import { useLocation } from '@reach/router'
import 'modern-normalize'
import '../styles/normalize'

import Header, { MenuLInks } from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import { useMeta } from '../hooks'

const IndexLayout: React.FC = ({ children }) => {
  const { siteMetadata, file } = useMeta()
  const { pathname } = useLocation()
  const pageTitle = React.useMemo(() => MenuLInks.find(m => m.page === pathname)?.text, [pathname])
  const siteTitle = React.useMemo(() => (pageTitle ? `${pageTitle} - ${siteMetadata.title}` : siteMetadata.title), [
    pageTitle,
    siteMetadata.title
  ])
  return (
    <LayoutRoot>
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
      <Header title={siteMetadata.title} />
      <LayoutMain>{children}</LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
