import React, { ReactNode } from "react";
import sectionClasses from "../styles/sections";

interface SectionColumnProps {
  children: ReactNode;
  orderClasses?: string;
}

const SectionColumn: React.FC<SectionColumnProps> = ({ children, orderClasses }) => {
  return (
    <div
      className={`${sectionClasses.column} ${orderClasses}`}
    >
      {children}
    </div>
  );
};

export default SectionColumn;