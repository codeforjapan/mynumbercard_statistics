//@ts-ignore
import TableauReport from 'tableau-react'

const SimpleReport = () => (
  <div>
    <TableauReport
      url="https://public.tableau.com/views/26886/sheet3?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:language=en&:loadOrderID=0"
      options={{ width: '100%', height: 600 }}
    />
  </div>
)

export default SimpleReport
