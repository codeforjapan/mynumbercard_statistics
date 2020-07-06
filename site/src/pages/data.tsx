import * as React from 'react'
import { graphql, Link } from "gatsby"
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface DirProps {
  data: {
    allDirectory: {
      edges: [
        {
          node: {
            name: string
            relativePath: string
            fields: {
              slug: string
            }
          }
        }
      ]
    }
  }
}

const Dirs: React.FC<DirProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>データ一覧</h1>
        <ul>
          {data.allDirectory.edges.map(({ node }) => (
            <li>
              <Link to={ `/${node.fields.slug}` } >
                {node.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  </IndexLayout>
)

export default Dirs
export const query = graphql`
  query {
    allDirectory(filter: {relativePath: {ne: ""}}) {
      edges {
        node {
          name
          relativePath
          fields {
            slug
          }
        }
      }
    }
  }
`