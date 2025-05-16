import { ReactNode } from "react";
import SideBarComponent from "./SideBarComponent";
import NavbarComponent from "./NavbarConponent";

type LayoutProps = {
  children: ReactNode;
};

export default function LayoutComponent({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <SideBarComponent />
      <div style={{ flex: 1 }}>
        <NavbarComponent />
        <div>{children}</div>
      </div>
    </div>
  );
}
