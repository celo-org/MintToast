import { FC, ReactNode } from "react";
import Footer from "./Footer";
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
        <div className="md:pt-5 pt-4 max-w-4xl mx-auto md:space-y-8 sm:px-6 lg:px-8 w-full flex justify-center items-start flex-grow h-full mb-14">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
