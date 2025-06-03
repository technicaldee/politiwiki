-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert sample politicians
INSERT INTO politicians (id, name, office, party, region, state, image_url, quote, email, twitter, phone, education, previous_roles, affiliations)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Bola Ahmed Tinubu', 'President', 'APC', 'South West', 'Lagos', 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&avatar1.jpg', 'Renewed Hope for Nigeria', 'president@nigeria.gov.ng', '@officialBAT', '+2341234567890', ARRAY['University of Chicago', 'Chicago State University'], ARRAY['Governor of Lagos State', 'Senator'], ARRAY['APC', 'ACN']),
  ('00000000-0000-0000-0000-000000000002', 'Peter Obi', 'Presidential Candidate', 'LP', 'South East', 'Anambra', 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&avatar2.jpg', 'From Consumption to Production', 'peter.obi@labourparty.ng', '@PeterObi', '+2341234567891', ARRAY['University of Nigeria', 'Oxford University'], ARRAY['Governor of Anambra State'], ARRAY['LP', 'PDP']),
  ('00000000-0000-0000-0000-000000000003', 'Atiku Abubakar', 'Presidential Candidate', 'PDP', 'North East', 'Adamawa', 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&avatar3.jpg', 'Unity and Progress', 'atiku@pdp.org.ng', '@atiku', '+2341234567892', ARRAY['Ahmadu Bello University'], ARRAY['Vice President of Nigeria'], ARRAY['PDP', 'APC']),
  ('00000000-0000-0000-0000-000000000004', 'Babajide Sanwo-Olu', 'Governor', 'APC', 'South West', 'Lagos', 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&avatar4.jpg', 'Greater Lagos Rising', 'governor@lagosstate.gov.ng', '@jidesanwoolu', '+2341234567893', ARRAY['University of Lagos', 'London Business School'], ARRAY['Commissioner for Commerce and Industry'], ARRAY['APC']),
  ('00000000-0000-0000-0000-000000000005', 'Nyesom Wike', 'Minister', 'PDP', 'South South', 'Rivers', 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&avatar5.jpg', 'Rivers First', 'wike@fct.gov.ng', '@GovWike', '+2341234567894', ARRAY['Rivers State University'], ARRAY['Governor of Rivers State'], ARRAY['PDP']);

-- Insert sample contributions
INSERT INTO contributions (id, politician_id, type, title, details, source_url, source_date, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'new_promise', 'Renewed Hope Agenda', 'Promised to create 1 million jobs in the first year of administration', 'https://example.com/source1', '2024-01-15', 'approved'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'statement', 'Fuel Subsidy Removal', 'Announced removal of fuel subsidy to save government funds', 'https://example.com/source2', '2024-02-01', 'pending'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'scandal', 'Campaign Finance', 'Under investigation for campaign finance violations during 2023 elections', 'https://example.com/source3', '2024-01-20', 'approved'),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'background', 'Business Career', 'Built successful business empire before entering politics', 'https://example.com/source4', '2024-02-10', 'approved'),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000004', 'new_promise', 'Lagos Blue Line', 'Completed the Lagos Blue Line metro project', 'https://example.com/source5', '2024-02-15', 'pending');

-- Create auth users first
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@politiwiki.ng', crypt('admin123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'moderator@politiwiki.ng', crypt('mod123', gen_salt('bf')), now(), now(), now());

-- Then insert their profiles
INSERT INTO profiles (id, email, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@politiwiki.ng', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'moderator@politiwiki.ng', 'moderator'); 