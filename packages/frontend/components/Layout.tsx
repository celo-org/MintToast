import { FC, ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-background overflow-hidden flex flex-col min-h-screen">
        <Header />
        <div className="w-full border-t-2 border-black"></div>
        <div className="md:pt-12 md:pb-16 pt-8 pb-24 max-w-4xl mx-auto md:space-y-8 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
