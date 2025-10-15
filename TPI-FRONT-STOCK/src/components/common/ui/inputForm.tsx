import { Controller, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";
interface Props<T extends FieldValues = FieldValues>{
  name: Path<T>
  control: Control<T>; 
  label: string;
  type?: string;
  error?: FieldError
}

export function InputForm <T extends FieldValues = FieldValues>({name, control, label, type, error}: Props<T>){

  return(
    <div className="w-[90%] flex flex-col mt-2">
      <label htmlFor={name} className="font-bold">{label}:</label>
      <Controller
        name={name}
        control={control}
        render={({ field })=>
          <input id={name} type={type} {...field} 
            className={`border rounded-lg px-2 ${error ? "border-[red]" : ""}`} 
          />}
      />
      {error && <p className="font-bold ms-4 text-sm">{error.message}</p>}
    </div>
  );
}