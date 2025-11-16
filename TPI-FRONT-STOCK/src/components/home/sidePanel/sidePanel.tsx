import useMediaQuery from "@mui/material/useMediaQuery";
import SidePanelDesktop from './sidePanelDesktop';
import SidePanelMobile from './sidePanelMobile';

export default function SidePanel() {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  return (
    <aside>
      {
        isDesktop
        ?
          <div className="fixed w-[15%] h-[100vh] bg-[#1f1c1c]">
            <SidePanelDesktop/>
          </div>
        : 
          <div className="w-full">
            <SidePanelMobile/>
          </div>
      }
    </aside>
  );
};
