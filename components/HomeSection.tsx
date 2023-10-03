import React, { ReactNode } from 'react';
interface HomeSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children, id, className }) => {
  return <div id={id} className={`flex flex-col items-center justify-center md:flex md:flex-row mx-12 mt-16 md:mx-12 lg:mx-44 lg:px-12 2xl:w-1/3 2xl:mx-auto ${className}`}>
    {children}
  </div>
};

export default HomeSection;