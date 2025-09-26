import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
}

const SponsorsCarousel = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching sponsors:', error);
          return;
        }

        setSponsors(data || []);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();

    // Set up real-time subscription for sponsor changes
    const channel = supabase
      .channel('sponsors-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sponsors' }, 
        () => {
          fetchSponsors();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSponsorClick = (websiteUrl: string) => {
    window.open(websiteUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Anúnciate con Nosotros</h2>
          <p className="text-lg text-muted-foreground">
            Conecta con la audiencia especializada en bienes raíces
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Anúnciate con Nosotros</h2>
          <p className="text-lg text-muted-foreground">
            Conecta con la audiencia especializada en bienes raíces
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay patrocinadores registrados en este momento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Anúnciate con Nosotros</h2>
          <p className="text-lg text-muted-foreground">
            Conecta con la audiencia especializada en bienes raíces
          </p>
        </div>

      <div className="max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sponsors.map((sponsor) => (
              <CarouselItem key={sponsor.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card 
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20 rounded-full overflow-hidden"
                  onClick={() => handleSponsorClick(sponsor.website_url)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-4">
                    <img
                      src={sponsor.logo_url}
                      alt={sponsor.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default SponsorsCarousel;