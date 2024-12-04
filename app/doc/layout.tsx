import LiveBlocksProvider from "@/components/LiveBlocksProvider"
import { Children } from "react"
function layout({children }:{children: React.ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}

export default layout