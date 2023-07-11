export default function BreakLine({ color="spec-turquoise", lineWidth="1/3" , lineHeight="1"}) {
  
  return (
    <hr 
      className={`
        my-6
        mx-auto 
        w-${lineWidth}
        h-${lineHeight}
        bg-spec-turquiose
        rounded
        border-0
      `}
    />
  )
}