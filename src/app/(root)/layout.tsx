import Sidebar from "./../components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <div className="root-conatainer">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;