import * as React from 'react'
import 'modern-normalize'
import { useLocation } from '@reach/router'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Meta from '../components/Meta'
import { MenuLInks } from '../components/Header'
import { useMeta } from '../hooks'

const IndexLayout: React.FC = ({ children }) => {
  const { siteMetadata } = useMeta()
  const { pathname } = useLocation()
  const pageTitle = React.useMemo(() => MenuLInks.find(m => m.page === pathname)?.text, [pathname])
  return (
    <>
      <Meta pageTitle={pageTitle} pathname={pathname} />
      <LayoutRoot>
        <Header title={siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    </>
  )
}

export default IndexLayout
