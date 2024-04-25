import routesAdmin from "@/routes/admin.routes";
import MenuSideBar from "./menu-side-bar";
import { RouteMenus } from "./route-menu";

export const SideBar = () => {
  return (
    <>
      <nav className="pointer-events-auto relative w-72 p-6 border-r">
        <RouteMenus />
      </nav>
    </>
  );
};
