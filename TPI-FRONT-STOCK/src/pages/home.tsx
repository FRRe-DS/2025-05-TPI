import SidePanel from "../components/home/sidePanel/sidePanel";
import { Outlet } from "react-router-dom";


export default function Home(){
  return (
    <>
      <div className="block lg:flex lg:flex-row">
        <div className="w-full lg:w-[15%]">
          <SidePanel/>
        </div>
        <main className="w-full lg:w-[85%]">
          <Outlet/>
        </main>
      </div>
    </>
  );
}