-- Insert sample subscription tiers for agents
INSERT INTO subscription_tiers (name, monthly_price, annual_price, property_limit, description) VALUES
('Bronce', 299, 2988, 5, 'Perfecto para agentes que están empezando'),
('Plata', 499, 4988, 15, 'Ideal para agentes con experiencia'),
('Oro', 799, 7988, 50, 'Para agentes profesionales activos'),
('Platino', 1299, 12988, null, 'Para agencias y agentes elite')
ON CONFLICT (name) DO UPDATE SET
  monthly_price = EXCLUDED.monthly_price,
  annual_price = EXCLUDED.annual_price,
  property_limit = EXCLUDED.property_limit,
  description = EXCLUDED.description;