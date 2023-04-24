export default function BreakLine({ color="white", lineWidth="1/3" , lineHeight="1"}) {
  
  return (
    <hr 
      className={`
        my-6
        mx-auto 
        w-${lineWidth}
        h-${lineHeight}
        bg-${color} 
        rounded 
        border-0
      `}
    />
  )
}