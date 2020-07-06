import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface DataTemplateProps {
  data: {
    allFile: {
      edges: [
        {
          node: {
            name: string
            base: string 
          }
        }
      ]
    }
  }
}

const DataTemplate: React.FC<DataTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
      </Container>
    </Page>
  </IndexLayout>
)

export default DataTemplate
export const query = graphql`
  query DataTemplateQuery($slug: String!) {
    allFile(filter: {relativeDirectory: {eq: $slug}}) {
      edges {
        node {
          id
        }
      }
    }
  }
`