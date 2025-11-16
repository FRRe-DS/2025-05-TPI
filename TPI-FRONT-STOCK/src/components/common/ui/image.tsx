import { clsx as cn } from 'clsx';

interface ImageProps {
  src: string;
  alt: string;
  styles?: string;
}

export default function Image({ src, alt, styles }: ImageProps) {

  return (
    <div className="relative w-full h-full flex items-center justify-center"> 
      <img
        src={src}
        alt={alt}
        className={cn('object-cover w-full h-full transition-opacity duration-300',styles)}
      />
    </div>
  );
}
