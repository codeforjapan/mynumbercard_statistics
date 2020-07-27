import * as React from 'react'
import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Head from '../components/Head'
import { useMeta } from '../hooks'

type Props = {
  children?: React.ReactNode;
}

const IndexLayout: React.FC<Props> = ({ children }) => {
  const { siteMetadata } = useMeta()
  return (
    <>
      <Head />
      <LayoutRoot>
        <Header title={siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    </>
  )
}

export default IndexLayout
