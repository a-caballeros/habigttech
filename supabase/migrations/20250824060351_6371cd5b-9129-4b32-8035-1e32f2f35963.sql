-- Update property limits for Plata and Oro tiers
UPDATE subscription_tiers 
SET property_limit = 10 
WHERE name = 'Plata';

UPDATE subscription_tiers 
SET property_limit = 15 
WHERE name = 'Oro';