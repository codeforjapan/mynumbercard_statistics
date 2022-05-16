import * as React from 'react'
import { graphql, Link } from 'gatsby'
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
          }
        }
      ]
    }
  }
}

const Dirs: React.FC<DirProps> = ({ data }) => (
  <IndexLayout title="データ一覧">
    <Page>
      <Container>
        <h1>データ一覧</h1>
        <p>
          こちらからCSV ファイルをダウンロードすることができます。下記のリンクは、総務省の PDF
          ファイルが公開された日付です。リンク先にCSVファイルがダウンロードできます。データ形式の詳細については
          <Link to="/aboutdata">データ形式について</Link>をご確認ください。
        </p>
        <p>
          <a href="https://drive.google.com/drive/u/0/folders/1G9HgcddjUzOzEQjXHNazXYOSaFdKxZIc">こちらのGoogle Spreadsheet</a>
          にも同じデータが保存してあります。
        </p>
        <ul>
        </ul>
      </Container>
    </Page>
  </IndexLayout>
)

export default Dirs
export const query = graphql`
  query {
    allDirectory(filter: { relativePath: { ne: "" }  }) {
      edges {
        node {
          name
          relativePath
        }
      }
    }
  }
`
