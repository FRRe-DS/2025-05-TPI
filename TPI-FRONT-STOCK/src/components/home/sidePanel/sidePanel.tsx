import useMediaQuery from "@mui/material/useMediaQuery"
import SidePanelDesktop from "./sidePanelDesktop"
import SidePanelMobile from "./sidePanelMobile"

export default function SidePanel() {
  const isDesktop = useMediaQuery("(min-width:1024px)")

  return (
    <aside>
      {isDesktop ? (
        <div className="fixed w-[15%] h-[100vh] bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950">
          <SidePanelDesktop />
        </div>
      ) : (
        <div className="w-full">
          <SidePanelMobile />
        </div>
      )}
    </aside>
  )
}
