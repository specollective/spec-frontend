import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function Heading0({ children, className = '', as: Tag = 'h1' }: HeadingProps) {
  const classes = `font-dmserif leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl ${className}`;
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

export function Heading1({ children, className = '', as: Tag = 'h2' }: HeadingProps) {
  const classes = `font-dmserif leading-tight text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl ${className}`;
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

export function Subtitle1({ children, className = '' }: HeadingProps) {
  const classes = `font-montserrat font-semibold leading-relaxed text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl ${className}`;
  return (
    <p className={classes}>
      {children}
    </p>
  )
}

export function Heading2({ children, className = '', as: Tag = 'h2' }: HeadingProps) {
  const classes = `font-dmserif leading-snug text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl ${className}`;
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

export function Heading3({ children, className = '', as: Tag = 'h3' }: HeadingProps) {
  const classes = `font-dmserif leading-snug text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl ${className}`;
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

export function Heading4({ children, className = '', as: Tag = 'h4' }: HeadingProps) {
  const classes = `font-medium leading-normal text-spec-gray tracking-wider font-montserrat text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ${className}`;
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}
