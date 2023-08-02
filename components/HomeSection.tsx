import React, { ReactNode } from "react";

interface HomeSectionProps {
  children: ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children }) => {
  return (
    <div className="mx-auto">{children}</div>
  );
};

export default HomeSection;