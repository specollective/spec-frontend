export function Grid({ children, columnCount = 1 }: { children: React.ReactNode; columnCount?: number; }) {
  return (
    <div className={`grid md:grid-cols-${columnCount}`}>
      {children}
    </div>
  )
}