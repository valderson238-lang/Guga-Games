import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SmartImage({ src, alt, className = '', fallbackTitle }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#16161B] via-[#101014] to-[#09090B] text-[#E5B82E] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gamepad2 className="w-8 h-8 mb-2 opacity-80" strokeWidth={1.75} />
        <span className="text-xs font-medium text-zinc-400 max-w-[20ch]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
