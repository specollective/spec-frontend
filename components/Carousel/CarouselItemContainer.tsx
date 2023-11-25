import { ReactNode } from 'react';

function ActiveItem({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-active
      data-te-carousel-item
      style={{backfaceVisibility: 'hidden'}}>
      {children}
    </div>
  )
}

export function ItemContainer({ children }: { children: ReactNode }) {
  return (
    <ActiveItem>{children}</ActiveItem>
  )
}