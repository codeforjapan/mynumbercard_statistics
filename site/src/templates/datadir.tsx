import * as React from 'react'
import { graphql, Link } from 'gatsby'

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
            publicURL: string
          }
        }
      ]
    }
  }
}

const DataTemplate: React.FC<DataTemplateProps> = ({ data, pageContext }) => (
  <IndexLayout>
    <Page>
      <Container>
        <Link to="/data">戻る</Link>
        <h1>{pageContext.slug}</h1>
        <ul>
          {data.allFile.edges.map(({ node }) => (
            <li>
              <Link to={node.publicURL}>
                {node.base}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  </IndexLayout>
)

export default DataTemplate
export const query = graphql`
  query DataTemplateQuery($slug: String!) {
    allFile(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          name
          base
          publicURL
        }
      }
    }
  }
`