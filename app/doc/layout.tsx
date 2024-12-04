import LiveBlocksProvider from "@/components/LiveBlocksProvider"

function layout({children }:{children: React.ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}

export default layout