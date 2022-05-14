import * as React from 'react'
// @ts-ignore
import TableauReport from 'tableau-react'

const tableauHeight = window.innerWidth <= 600 ? 2050 : 1600
const SimpleReport: React.FC = () => (
  <div>
    <TableauReport
      url="https://public.tableau.com/views/26886/sheet3?:language=en-US&:display_count=y&:origin=viz_share_link"
      options={{ width: '100%', height: tableauHeight, class: 'tableau-report' }}
    />
  </div>
)

export default SimpleReport
