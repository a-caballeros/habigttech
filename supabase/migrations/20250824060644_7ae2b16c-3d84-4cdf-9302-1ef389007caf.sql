-- Update property limits for subscription tiers
UPDATE subscription_tiers 
SET property_limit = 3 
WHERE name = 'Bronce';

UPDATE subscription_tiers 
SET property_limit = 5 
WHERE name = 'Plata';

UPDATE subscription_tiers 
SET property_limit = 7 
WHERE name = 'Oro';