import { useRef } from "react";

export const useElementBackDrop = (
  parentRef: React.RefObject<HTMLHeadingElement>
) => {
  const menuBackDrop = useRef<HTMLHeadingElement>(null);

  const setTop = (target: HTMLElement) => {
    if (!parentRef.current) {
      return;
    }

    if (!menuBackDrop.current) {
      return;
    }

    const parentRefBounding = parentRef.current.getBoundingClientRect();
    const { top } = target.getBoundingClientRect();
    menuBackDrop.current.style.transform = `translateY(${
      top - parentRefBounding.top
    }px)`;
    setVisible("visible");
  };

  const setVisible = (visible: "hidden" | "visible") => {
    if (menuBackDrop && menuBackDrop.current) {
      menuBackDrop.current.style.visibility = `${visible}`;
      menuBackDrop.current.style.opacity = visible === "visible" ? "1" : "0";
    }
  };

  return {
    menuBackDrop,
    setTop,
    setVisible,
  };
};
