"use client";
import routesAdmin from "@/routes/admin.routes";
import MenuSideBar from "./menu-side-bar";

export const RouteMenus = () => {
  return (
    <>
      <MenuSideBar title="Principal" routes={routesAdmin} />
    </>
  );
};
