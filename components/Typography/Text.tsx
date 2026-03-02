import React, { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
}

export function Text1({ children, className }: TextProps) {
  return (
    <p className={`font-montserrat leading-relaxed text-xl md:text-2xl ${className}`}>
      {children}
    </p>
  )
}

export function Text2({ children, className }: TextProps) {
  return (
    <p className={`font-montserrat leading-relaxed text-sm md:text-base ${className}`}>
      {children}
    </p>
  )
}
