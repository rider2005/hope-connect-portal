
import { cn } from '@/lib/utils';
import { Hospital } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  textClassName?: string;
  showText?: boolean;
  isLink?: boolean;
}

const Logo = ({ 
  className, 
  textClassName,
  showText = true,
  isLink = true
}: LogoProps) => {
  const content = (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="bg-hopeBlue rounded-full p-1.5 text-white">
        <Hospital className="h-5 w-5" />
      </div>
      {showText && (
        <span className={cn('font-semibold text-hopeDark text-lg', textClassName)}>
          HopeConnect
        </span>
      )}
    </div>
  );

  if (isLink) {
    return <Link to="/">{content}</Link>;
  }

  return content;
};

export default Logo;
