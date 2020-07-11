import * as React from 'react'
import { Link } from 'gatsby'
import loadable from '@loadable/component'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
const PrefectureReport = loadable(() => import('../components/PrefectureReport'))

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>マイナンバー普及率</h1>
        <p>
          マイナンバーカードの交付率のダッシュボードです。{' '}
          <a href="https://www.soumu.go.jp/kojinbango_card/" target="_blank">
            総務省にあるPDF
          </a>
          「マイナンバーカード交付状況について」からCSVデータを抜き出し、CSVとして保存しています。
        </p>
        <PrefectureReport></PrefectureReport>
        <Link to="/data">CSVデータ一覧へ</Link>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
