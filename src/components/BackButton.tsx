import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick?: () => void;
  fallbackPath?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = "mb-4", 
  variant = "ghost",
  onClick,
  fallbackPath = "/"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Try to go back, but if there's no history, go to fallback path
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(fallbackPath);
      }
    }
  };

  return (
    <Button variant={variant} onClick={handleClick} className={className}>
      <ArrowLeft className="h-4 w-4 mr-2" />
      Volver
    </Button>
  );
};

export default BackButton;