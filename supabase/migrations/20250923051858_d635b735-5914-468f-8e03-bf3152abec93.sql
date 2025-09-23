-- Create sponsor-logos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsor-logos', 'sponsor-logos', true);

-- Create policies for sponsor logos
CREATE POLICY "Sponsor logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'sponsor-logos');

CREATE POLICY "Admins can upload sponsor logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'sponsor-logos' AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update sponsor logos" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'sponsor-logos' AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete sponsor logos" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'sponsor-logos' AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);