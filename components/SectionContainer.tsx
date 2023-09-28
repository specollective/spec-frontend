import React, { ReactNode } from "react";
import sectionClasses from "../styles/sections";

type SectionContainerProps = {
  children: ReactNode;
};

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <section className={sectionClasses.container}>{children}</section>
  );
};
