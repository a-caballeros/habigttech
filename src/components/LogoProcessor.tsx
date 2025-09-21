import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

const LogoProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processLogo = async () => {
    setIsProcessing(true);
    toast.info('Procesando isotipo...');

    try {
      // Load the current isotipo
      const response = await fetch('/habi-isotipo.png');
      const blob = await response.blob();
      
      // Load as image element
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Download the processed image
      const url = URL.createObjectURL(processedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'habi-isotipo-transparent.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Isotipo procesado y descargado con fondo transparente');
    } catch (error) {
      console.error('Error processing logo:', error);
      toast.error('Error al procesar el isotipo');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Procesador de Isotipo</h2>
      <p className="text-muted-foreground mb-4">
        Procesa el isotipo actual para remover el fondo y hacerlo transparente.
      </p>
      <Button 
        onClick={processLogo} 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Procesando...' : 'Procesar Isotipo (Remover Fondo)'}
      </Button>
    </div>
  );
};

export default LogoProcessor;