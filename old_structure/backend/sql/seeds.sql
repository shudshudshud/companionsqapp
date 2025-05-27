-- Insert sample users
INSERT INTO users (clerk_id, email) VALUES
  ('user_123', 'demo@example.com')
ON CONFLICT (clerk_id) DO NOTHING;

-- Insert sample subscriptions
INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan_type, status, current_period_start, current_period_end)
SELECT 
  u.id,
  'cus_demo123',
  'sub_demo123',
  'pro',
  'active',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP + INTERVAL '1 month'
FROM users u
WHERE u.clerk_id = 'user_123'
ON CONFLICT DO NOTHING;

-- Insert sample people
INSERT INTO people (user_id, name, relationship, notes)
SELECT 
  u.id,
  'John Doe',
  'Friend',
  'Met at the tech conference'
FROM users u
WHERE u.clerk_id = 'user_123'
ON CONFLICT DO NOTHING;

-- Insert sample reflections
INSERT INTO reflections (user_id, content, mood, insights)
SELECT 
  u.id,
  'Today was a productive day. I completed the project proposal and had a great meeting with the team.',
  'Happy',
  '{"key_points": ["Project progress", "Team collaboration"], "emotions": ["Satisfaction", "Excitement"]}'
FROM users u
WHERE u.clerk_id = 'user_123'
ON CONFLICT DO NOTHING;

-- Link reflection to person
INSERT INTO reflection_people (reflection_id, person_id)
SELECT 
  r.id,
  p.id
FROM reflections r
JOIN people p ON p.user_id = r.user_id
JOIN users u ON u.id = r.user_id
WHERE u.clerk_id = 'user_123'
ON CONFLICT DO NOTHING; 