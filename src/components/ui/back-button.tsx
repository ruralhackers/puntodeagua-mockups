'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';

interface BackButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackButton({ href, className = '', children }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0 h-auto ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children || 'Volver'}
    </Button>
  );
}