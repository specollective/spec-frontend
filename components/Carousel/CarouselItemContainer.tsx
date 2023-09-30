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

function InactiveItem({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style={{backfaceVisibility: 'hidden'}}>
      {children}
    </div>
  )
}

export function ItemContainer({ first, children }: { first: boolean, children: ReactNode }) {
  const WrapperItem = first ? ActiveItem : InactiveItem;

  return (
    <WrapperItem>{children}</WrapperItem>
  )
}