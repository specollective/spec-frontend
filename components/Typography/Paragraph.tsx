import React, { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export function Paragraph0({ children, className }: ParagraphProps) {
  return (
    <p className={`font-montserrat text-2xl md:text-2xl lg:text-3xl 2xl:text-6xl py-2 ${className}`}>
      {children}
    </p>
  )
}

export function Paragraph1({ children, className }: ParagraphProps) {
  return (
    <p className={`font-montserrat text-base md:text-xl ${className} py-2`}>
      {children}
    </p>
  )
}

export function Paragraph2({ children, className }: ParagraphProps) {
  return (
    <p className={`text-sm md:text-base ${className}`}>
      {children}
    </p>
  )
}