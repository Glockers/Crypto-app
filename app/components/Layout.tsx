import { ReactElement, ReactNode, useState } from "react";
import { LayoutModal } from "./LayoutModal";
import { Header } from "./Header";

type TLayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: TLayoutProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <main>{children}</main>
      <LayoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Layout;
