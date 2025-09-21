import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

const ImageUpload = ({ 
  onImagesSelected, 
  maxFiles = 10, 
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className 
}: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Tipo de archivo no válido",
        description: `Solo se permiten archivos: ${acceptedTypes.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Archivo muy grande",
        description: `El archivo debe ser menor a ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileSelection = (files: FileList) => {
    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file) && validFiles.length + selectedImages.length < maxFiles) {
        validFiles.push(file);
      }
    }

    if (validFiles.length + selectedImages.length > maxFiles) {
      toast({
        title: "Límite de archivos excedido",
        description: `Solo puedes subir máximo ${maxFiles} archivos`,
        variant: "destructive",
      });
    }

    const newImages = [...selectedImages, ...validFiles].slice(0, maxFiles);
    setSelectedImages(newImages);
    onImagesSelected(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    onImagesSelected(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={(e) => e.target.files && handleFileSelection(e.target.files)}
        className="hidden"
      />
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging 
            ? 'border-accent bg-accent/10' 
            : 'border-muted-foreground/25 hover:border-accent/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Subir fotografías</h3>
        <p className="text-muted-foreground mb-4">
          Arrastra y suelta tus fotos aquí, o haz clic para seleccionar
        </p>
        <Button variant="outline" type="button">
          Seleccionar Archivos
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          JPG, PNG, WEBP hasta {maxSize}MB por archivo. Máximo {maxFiles} fotos.
        </p>
      </div>

      {/* Preview Grid */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {selectedImages.map((file, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;