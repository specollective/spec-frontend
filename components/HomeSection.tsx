import React, { ReactNode } from 'react';
interface HomeSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

// NOTE: Tailwind breakpoints for reference
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
const HomeSection: React.FC<HomeSectionProps> = ({ children, id, className }) => {
  return <div id={id} className={`flex flex-col items-center justify-center md:flex-row px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 max-w-screen-xl mx-auto ${className}`}>
    {children}
  </div>
};

export default HomeSection;