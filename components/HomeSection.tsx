import React, { ReactNode } from 'react';
interface HomeSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children, id, className }) => {
  return <div id={id} className={`flex flex-col items-center justify-center md:flex md:flex-row mx-10 xl:mx-24 mt-16 2xl:px-30 2xl:max-w-screen-xl 2xl:mx-auto ${className}`}>
    {children}
  </div>
};

export default HomeSection;