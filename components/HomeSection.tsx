import React, { ReactNode } from "react";
interface HomeSectionProps {
  children: ReactNode;
  id?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children, id }) => {
  return <div id={id} className="flex flex-col items-center justify-center md:flex md:flex-row mx-12 my-16 md:mx-12 lg:mx-44 lg:px-12 2xl:w-1/2 2xl:mx-auto">
    {children}
  </div>
};

export default HomeSection;