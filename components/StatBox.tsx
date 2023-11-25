import { ReactNode } from 'react';
interface StatBoxProps {
  height: string;
  width: string;
  className: string;
  children: ReactNode;
}

export default function StatBox({ height, width, className, children }: StatBoxProps) {
  return (
    <div
      className={`${className} flex flex-col ${height} ${width} justify-center text-center p-4`}
    >
      {children}
    </div>
  );
}