import * as React from 'react'
import 'modern-normalize'
import '../styles/normalize'

import Menu from '../components/Menu'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Head from '../components/Head'
import { useMeta } from '../hooks'

type Props = {
  children?: React.ReactNode;
  title?: string;
}

const IndexLayout: React.FC<Props> = ({ children, title }) => {
  const { siteMetadata } = useMeta()
  return (
    <>
      <Head title={title}/>
      <LayoutRoot>
        <Menu title={siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    </>
  )
}

export default IndexLayout
