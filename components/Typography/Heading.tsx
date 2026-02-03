type HeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export function Heading0({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Heading1({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl ${className}`;
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export function Subtitle1({ children, className = '' }: HeadingProps) {
  const classes = `font-montserrat font-semibold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl ${className}`;
  return (
    <p className={classes}>
      {children}
    </p>
  )
}

export function Heading2({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl ${className}`;
  return (
    <h2 className={classes}>
      {children}
    </h2>
  )
}

export function Heading3({ children, className = '' }: HeadingProps) {
  const classes = `font-dmserif text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl ${className}`;
  return (
    <h3 className={classes}>
      {children}
    </h3>
  )
}

export function Heading4({ children, className = '' }: HeadingProps) {
  const classes = `font-medium text-spec-gray tracking-wider font-montserrat text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl ${className}`;
  return (
    <h4 className={classes}>
      {children}
    </h4>
  )
}