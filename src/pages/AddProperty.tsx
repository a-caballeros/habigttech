import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Upload, MapPin, Home, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

const propertySchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  price: z.string().min(1, "El precio es requerido"),
  location: z.string().min(3, "La ubicación es requerida"),
  property_type: z.string().min(1, "El tipo de propiedad es requerido"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  area: z.string().min(1, "El área es requerida"),
  amenities: z.array(z.string()).optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;

const AddProperty = () => {
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Redirect non-agents
  if (userType !== 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Restringido</h1>
          <p className="text-muted-foreground mb-4">Esta funcionalidad es solo para agentes inmobiliarios.</p>
          <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  // Redirect agents without subscription to pricing (except super admin)
  if (userType === 'agent' && !subscriptionLoading && !hasActiveSubscription && user?.email !== 'caballerosalfonso@gmail.com') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <Crown className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-2xl font-bold mb-4">Suscripción Requerida</h1>
          <p className="text-muted-foreground mb-6">
            Necesitas una suscripción activa para publicar propiedades.
          </p>
          <div className="space-y-4">
            <Button onClick={() => navigate('/subscription')} size="lg">
              Ver Planes de Suscripción
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      property_type: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      amenities: [],
    },
  });

  const selectedPropertyType = form.watch("property_type");

  const onSubmit = async (data: PropertyForm) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // First upload images if any
      let imageUrls: string[] = [];
      if (selectedImages.length > 0) {
        for (const image of selectedImages) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `properties/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(filePath, image);

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            continue; // Skip this image and continue with others
          }

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(filePath);

          imageUrls.push(publicUrl);
        }
      }

      console.log('Saving property with data:', {
        title: data.title,
        description: data.description,
        amenities: selectedAmenities,
        images: imageUrls,
        agent_id: user.id
      }); // Debug log

      const propertyData = {
        agent_id: user.id,
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        location: data.location,
        property_type: data.property_type,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : 0,
        bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : 0,
        area: parseInt(data.area),
        status: 'active',
        images: imageUrls.length > 0 ? imageUrls : [],
        amenities: selectedAmenities.length > 0 ? selectedAmenities : []
      };

      console.log('Final property data to insert:', propertyData); // Debug log

      const { error, data: insertedData } = await supabase
        .from('properties')
        .insert(propertyData)
        .select();

      console.log('Insert result:', { error, insertedData }); // Debug log

      if (error) throw error;

      toast({
        title: "Propiedad creada",
        description: "Tu propiedad ha sido publicada exitosamente.",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating property:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la propiedad. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Agregar Nueva Propiedad</h1>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Información Básica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la propiedad</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Casa moderna con jardín"
                      {...form.register("title")}
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="property_type">Tipo de propiedad</Label>
                    <Select onValueChange={(value) => form.setValue("property_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="local_comercial">Local Comercial</SelectItem>
                        <SelectItem value="oficina">Oficina</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.property_type && (
                      <p className="text-sm text-destructive">{form.formState.errors.property_type.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe las características principales de la propiedad..."
                    rows={4}
                    {...form.register("description")}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location & Price */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ubicación y Precio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      placeholder="Ej: Zona 14, Ciudad de Guatemala"
                      {...form.register("location")}
                    />
                    {form.formState.errors.location && (
                      <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (Q)</Label>
                    <Input
                      id="price"
                      placeholder="Ej: 1500000"
                      type="number"
                      {...form.register("price")}
                    />
                    {form.formState.errors.price && (
                      <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Propiedad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedPropertyType !== "terreno" && (
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Habitaciones</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        placeholder="3"
                        {...form.register("bedrooms")}
                      />
                      {form.formState.errors.bedrooms && (
                        <p className="text-sm text-destructive">{form.formState.errors.bedrooms.message}</p>
                      )}
                    </div>
                  )}

                  {selectedPropertyType !== "terreno" && (
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Baños</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="2"
                        {...form.register("bathrooms")}
                      />
                      {form.formState.errors.bathrooms && (
                        <p className="text-sm text-destructive">{form.formState.errors.bathrooms.message}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="area">Área (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      min="1"
                      placeholder="180"
                      {...form.register("area")}
                    />
                    {form.formState.errors.area && (
                      <p className="text-sm text-destructive">{form.formState.errors.area.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Características y Amenidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { value: 'piscina', label: 'Piscina' },
                    { value: 'cocina_equipada', label: 'Cocina Equipada' },
                    { value: 'sala_equipada', label: 'Sala Equipada' },
                    { value: 'cuartos_equipados', label: 'Cuartos Equipados' },
                    { value: 'lavanderia_equipada', label: 'Lavandería Equipada' },
                    { value: 'seguridad_24_7', label: 'Seguridad 24/7' },
                    { value: 'balcon', label: 'Balcón' },
                    { value: 'jardin', label: 'Jardín' },
                    { value: 'terraza', label: 'Terraza' },
                    { value: 'parqueo_techado', label: 'Parqueo Techado' },
                  ].map((amenity) => (
                    <div key={amenity.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.value}
                        checked={selectedAmenities.includes(amenity.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity.value]);
                          } else {
                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.value));
                          }
                        }}
                      />
                      <Label htmlFor={amenity.value} className="text-sm font-normal">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Fotografías de la Propiedad</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImagesSelected={setSelectedImages}
                  maxFiles={10}
                  maxSize={5}
                />
                {selectedImages.length > 0 && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {selectedImages.length} imagen{selectedImages.length !== 1 ? 'es' : ''} seleccionada{selectedImages.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Publicando..." : "Publicar Propiedad"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;