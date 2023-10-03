import React, { ReactNode } from 'react';
interface HomeSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }

const HomeSection: React.FC<HomeSectionProps> = ({ children, id, className }) => {
  // return <div id={id} className={`flex flex-col items-center justify-center md:flex md:flex-row mx-10 xl:mx-24 mt-16 2xl:px-30 2xl:max-w-screen-xl 2xl:mx-auto ${className}`}>
  return <div id={id} className={`flex flex-col items-center justify-center md:flex md:flex-row mx-10 md:mx-12 lg:mx-16 mt-16 xl:mx-52 2xl:px-50 2xl:max-w-screen-xl 2xl:mx-auto ${className}`}>
    {children}
  </div>
};

export default HomeSection;