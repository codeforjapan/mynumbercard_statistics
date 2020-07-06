import * as React from 'react'
import { graphql } from "gatsby"
import IndexLayout from '../layouts'

interface DirProps {
  data: {
    allDirectory: {
      edges: [
        {
          node: {
            name: string
            relativePath: string
          }
        }
      ]
    }
  }
}

const Dirs: React.FC<DirProps> = ({ data }) => (
  <IndexLayout>
    <h1>データ一覧</h1>
    <ul>
      {data.allDirectory.edges.map(({ node }) => (
        <li>
          {node.name}
        </li>
      ))}
    </ul>
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
        }
      }
    }
  }
`