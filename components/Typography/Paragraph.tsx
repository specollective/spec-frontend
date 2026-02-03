import React, { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export function Paragraph0({ children, className }: ParagraphProps) {
  return (
    <p className={`font-montserrat text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-4xl ${className}`}>
      {children}
    </p>
  )
}

export function Paragraph1({ children, className }: ParagraphProps) {
  return (
    <p className={`font-montserrat text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl ${className}`}>
      {children}
    </p>
  )
}

export function Paragraph2({ children, className }: ParagraphProps) {
  return (
    <p className={`font-montserrat text-sm md:text-base lg:text-base xl:text-base 2xl:text-base ${className}`}>
      {children}
    </p>
  )
}