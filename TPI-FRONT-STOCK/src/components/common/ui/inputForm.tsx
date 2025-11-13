import { Controller, type Control, type FieldError, type FieldValues, type Path, type ControllerRenderProps } from "react-hook-form";

interface InputFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

export function InputForm<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
  disabled = false,
  className = "",
}: InputFormProps<T>) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
          <input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}