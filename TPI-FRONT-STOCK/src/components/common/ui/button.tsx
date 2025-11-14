type Data<T> = T | null

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
  bgColor: string; 
  textColor: string;
};

export default function Button<T> ( {label, onClick, bgColor, textColor} : ButtonProps<T> ){
  return(
    <button onClick={()=>{ onClick() }}
      className={`w-full text-md bg-[${bgColor}] text-[${textColor? textColor: 'white'}] 
      font-bold py-2 my-2  rounded hover:cursor-pointer transition-colors`}>
      <div className="w-full text-center">
        {label}
      </div>
    </button>
  );
}