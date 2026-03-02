import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  const classes = `font-medium leading-normal text-spec-gray tracking-wider font-montserrat text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ${className}`;
  return <p className={classes}>{children}</p>;
}
