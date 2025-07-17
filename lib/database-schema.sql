-- EMU Database Schema
-- Execute this in your Supabase SQL editor

-- Create strategies table
CREATE TABLE strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  prd_content text NOT NULL,
  analysis jsonb,
  channels jsonb,
  strategy jsonb,
  status varchar(50) DEFAULT 'processing' CHECK (status IN ('processing', 'complete', 'error')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE strategies ENABLE ROW LEVEL SECURITY;

-- Create policy for users to access only their own strategies
CREATE POLICY "Users can only access their own strategies" 
ON strategies
FOR ALL 
USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_strategies_updated_at 
BEFORE UPDATE ON strategies 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();