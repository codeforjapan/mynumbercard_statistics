import * as React from "react";
import { graphql, Link } from "gatsby";

import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts";

interface DataTemplateProps {
  data: {
    allFile: {
      edges: [
        {
          node: {
            name: string;
            base: string;
            fields: {
              href: string;
            };
          };
        }
      ];
    };
  };
  pageContext: {
    slug: string;
  };
}

const DataTemplate: React.FC<DataTemplateProps> = ({ data, pageContext }) => (
  <IndexLayout>
    <Page>
      <Container>
        <Link to="/data">戻る</Link>
        <h1>{pageContext.slug}</h1>
        <ul>
          {data.allFile.edges.map(({ node }) => (
            <li key={node.base}>
              <a href={node.fields.href}>{node.base}</a>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  </IndexLayout>
);

export default DataTemplate;
export const query = graphql`
  query DataTemplateQuery {
    allFile {
      edges {
        node {
          name
          base
          fields {
            href
          }
        }
      }
    }
  }
`;
