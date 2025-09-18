-- Grant admin users permission to delete properties
CREATE POLICY "Admins can delete any property" 
ON public.properties 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);