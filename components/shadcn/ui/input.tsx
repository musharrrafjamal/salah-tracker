import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <div className="relative max-h-full h-full">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </span>
          )}
          <input
            placeholder={props.placeholder}
            ref={ref}
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-primary rounded-md ${icon ? 'pl-10' : ''}`}
            {...props}
          />
        </div>
        {error && (
          <div className="text-red-500 text-xs mt-1">{error}</div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

