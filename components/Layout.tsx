import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="m-2 flex min-h-sceen">
      <Navbar />
      <div className="bg-gray-200 rounded-lg mt-2 mb-2 mr-2 ml-0 flex-grow h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
