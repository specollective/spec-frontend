import React, { ReactNode } from "react";
interface HomeSectionProps {
  children: ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children }) => {
  return <div className="flex flex-col lg:flex lg:flex-row mx-12 my-16 md:mx-12 lg:mx-44 lg:px-12 items-center justify-center">{children}</div>
};

export default HomeSection;