type HeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export function Heading0({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-4xl lg:text-7xl 2xl:text-8xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Heading1({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-3xl md:text-4xl 2xl:text-5xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Subtitle1({ children, className = '' }: HeadingProps) {
  const classes = `font-montserrat font-semibold text-base md:text-lg 2xl:text-2xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Heading2({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-xl md:text-4xl 2xl:text-3xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Heading3({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-lg md:text-2xl 2xl:text-4xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Heading4({ children, className = '' }: HeadingProps) {
  const classes = `font-medium opacity-40 text-black tracking-wider font-montserrat text-lg md:text-xl 2xl:text-3xl ${className} pb-2`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}