import * as React from 'react'
import { Link } from 'gatsby'
import loadable from '@loadable/component'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

const PrefectureReport = loadable(() => import('../components/PrefectureReport'))

const IndexPage: React.FC = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>マイナンバーカード普及状況ダッシュボード</h1>
        <p>
          マイナンバーカードの交付率のダッシュボードです。{' '}
          <a href="https://www.soumu.go.jp/kojinbango_card/" target="_blank" rel="noopener noreferrer">
            総務省にあるPDF
          </a>
          「マイナンバーカード交付状況について」からCSVデータを抜き出し、CSVとして保存しています。
        </p>
        <PrefectureReport />
        <Link to="/data">CSVデータ一覧へ</Link>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
