/*
  # Initial Schema for PolitiWiki

  1. New Tables
    - `politicians`
      - Basic profile information
      - Contact details
      - Background information
    - `promises`
      - Campaign promises and commitments
      - Status tracking
    - `statements`
      - Public statements and quotes
    - `scandals`
      - Controversies and investigations
    - `contributions`
      - User-submitted updates and evidence
    - `ratings`
      - User ratings and feedback

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Politicians table
CREATE TABLE IF NOT EXISTS politicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  office text NOT NULL,
  region text NOT NULL,
  party text NOT NULL,
  quote text,
  email text,
  twitter text,
  phone text,
  education text[],
  previous_roles text[],
  affiliations text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Promises table
CREATE TABLE IF NOT EXISTS promises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id uuid REFERENCES politicians(id) ON DELETE CASCADE,
  title text NOT NULL,
  details text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in-progress', 'delivered')),
  source text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Statements table
CREATE TABLE IF NOT EXISTS statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id uuid REFERENCES politicians(id) ON DELETE CASCADE,
  quote text NOT NULL,
  date date NOT NULL,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Scandals table
CREATE TABLE IF NOT EXISTS scandals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id uuid REFERENCES politicians(id) ON DELETE CASCADE,
  title text NOT NULL,
  details text NOT NULL,
  status text NOT NULL,
  sources text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  politician_id uuid REFERENCES politicians(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('new_promise', 'promise_update', 'statement', 'scandal', 'background')),
  title text NOT NULL,
  details text NOT NULL,
  source_url text NOT NULL,
  source_date date NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  politician_id uuid REFERENCES politicians(id) ON DELETE CASCADE,
  rating boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, politician_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE politicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE scandals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Allow users to read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for politicians table
CREATE POLICY "Allow public read access to politicians"
  ON politicians
  FOR SELECT
  TO public
  USING (true);

-- Policies for promises table
CREATE POLICY "Allow public read access to promises"
  ON promises
  FOR SELECT
  TO public
  USING (true);

-- Policies for statements table
CREATE POLICY "Allow public read access to statements"
  ON statements
  FOR SELECT
  TO public
  USING (true);

-- Policies for scandals table
CREATE POLICY "Allow public read access to scandals"
  ON scandals
  FOR SELECT
  TO public
  USING (true);

-- Policies for contributions table
CREATE POLICY "Allow authenticated users to create contributions"
  ON contributions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to read their own contributions"
  ON contributions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for ratings table
CREATE POLICY "Allow authenticated users to rate"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to read their own ratings"
  ON ratings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_politicians_updated_at
    BEFORE UPDATE ON politicians
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promises_updated_at
    BEFORE UPDATE ON promises
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scandals_updated_at
    BEFORE UPDATE ON scandals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();