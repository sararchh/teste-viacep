import Link from 'next/link';
import React from 'react';

export interface ButtonProps {
   type?: 'button' | 'submit' | 'reset';
   href?: string;
   target?: string;
   className?: string;
   onClick?: () => void | Promise<void>;
   children: string | React.ReactNode;
   disabled?: boolean;
}


export const ContainerComponent: React.FC<ButtonProps> = ({
   className,
   type = 'button',
   children,
   onClick,
   disabled = false,
}) => {
   return (
      <button
         type={type}
         className={`flex flex-row justify-center items-center p-[2px] mx-[2px] text-xs ${className}`}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
};

const WithLink = (props: ButtonProps) => (
   <Link href={props.href || '#'} target={props?.target ? props.target : '_self'}>
      <ContainerComponent {...props} />
   </Link>
);

export const ButtonComponent = (props: ButtonProps) =>
   props.href ? <WithLink {...props} /> : <ContainerComponent {...props} />;
