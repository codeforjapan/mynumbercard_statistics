import React, {  useEffect } from "react";
// @ts-ignore
//import TableauReport from 'tableau-react'
const Tableau = require('tableau-api-js');

const tableauHeight = window.innerWidth <= 600 ? 2050 : 1600
const initViz = () => {
  // Tableauを埋め込む要素を取得
  const containerDiv:any = document.getElementById('viz1652600169851');
  // URL
  const vizUrl = 'https://public.tableau.com/views/26886/sheet3?:language=en-US&:display_count=n&:origin=viz_share_link';
  // 描画オプション生成
  const options = {
      width: containerDiv.offsetWidth,
      height: tableauHeight,
  };
  // Tableau呼び出し
  new Tableau.Viz(containerDiv, vizUrl, options);
};
class SimpleReport extends React.Component {
  componentDidMount() {
    initViz()
  }

  render() {
    return (
  <div>
  <div id="viz1652600169851">
  </div>
  </div>
    )
  }
}
export default SimpleReport
