import React, { ReactNode } from "react";
import sectionClasses from "../styles/sections";
interface HomeSectionProps {
  children: ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children }) => {
  return (
    <div className={sectionClasses.container}>{children}</div>
  );
};

export default HomeSection;