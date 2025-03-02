"use client";
import { overrideClass } from '@/utils/tailwindcss';
import React from 'react';


interface Props {
   className?: string;
   classInput?: string;
   name: string;
   placeholder: string;
   type?: string;
   value: string;
   label?: string;
   required?: boolean;
   disabled?: boolean;
   onChange?: (value: string ) => void ;
   helperText?: string | null;
   endAddorment?: React.ReactNode;
}

export const InputComponent: React.FC<Props> = ({
   className = '',
   classInput = '',
   name,
   placeholder,
   type = 'text',
   value,
   label,
   onChange = () => null,
   required = false,
   disabled = false,
   helperText,
   endAddorment,
}) => {
   return (
      <div className={`relative mb-0 ${className}`}>
         {label && <label className="text-sm">{label}</label>}
         <input
            className={overrideClass(
               `w-full h-[50px] relative py-2 px-4 rounded-lg bg-white border outline-none`,
               classInput
            )}
            name={name}
            placeholder={placeholder}
            aria-label={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            disabled={disabled}
            required={required}
         />
         {Boolean(endAddorment) && (
            <span className="absolute mt-[10px] ml-[-10px]">{endAddorment}</span>
         )}
         <p className="text-sm h-[20px] leading-normal mt-1 ml-1 text-red-800 dark:text-red-500">
            {helperText ? helperText : ''}
         </p>
      </div>
   );
};
