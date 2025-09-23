import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LogoUploadProps {
  onLogoUploaded: (url: string) => void;
  currentLogoUrl?: string;
  disabled?: boolean;
}

const LogoUpload = ({ onLogoUploaded, currentLogoUrl, disabled }: LogoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Por favor selecciona una imagen válida",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen no debe exceder 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('sponsor-logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('sponsor-logos')
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setPreviewUrl(urlData.publicUrl);
        onLogoUploaded(urlData.publicUrl);
        toast({
          title: "Éxito",
          description: "Logo subido correctamente"
        });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Error",
        description: "Error al subir el logo. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onLogoUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Logo del Patrocinador</Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      {previewUrl ? (
        <div className="relative inline-block">
          <div className="w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg overflow-hidden bg-muted/10">
            <img
              src={previewUrl}
              alt="Logo preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          {!disabled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      ) : (
        <div 
          className={`w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={!disabled ? triggerFileSelect : undefined}
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground text-center mt-2">
                Click para subir logo
              </span>
            </>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={triggerFileSelect}
          disabled={disabled || uploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Subiendo...' : 'Subir Logo'}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Formatos soportados: JPG, PNG, WEBP. Tamaño máximo: 5MB.
      </p>
    </div>
  );
};

export default LogoUpload;