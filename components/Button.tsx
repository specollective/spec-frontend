import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-montserrat font-semibold tracking-wide
    rounded-br-3xl rounded-tl-3xl
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-spec-turquoise text-white border-4 border-spec-turquoise
      hover:bg-white hover:text-black
      focus:ring-spec-turquoise
    `,
    secondary: `
      bg-spec-yellow text-black border-4 border-spec-yellow
      hover:bg-white hover:border-spec-yellow
      focus:ring-spec-yellow focus:ring-offset-spec-turquoise
    `,
    outline: `
      bg-transparent text-black border-2 border-black
      hover:bg-black hover:text-white
      focus:ring-black
    `,
  };

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
