-- Create wedding_rsvp table
CREATE TABLE IF NOT EXISTS wedding_rsvp (
  id TEXT PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  attendance VARCHAR NOT NULL,
  guests VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wedding_wishes table
CREATE TABLE IF NOT EXISTS wedding_wishes (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE wedding_rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_wishes ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert/read/delete (for guest page)
-- RSVP policies
CREATE POLICY "Allow public insert" ON wedding_rsvp 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON wedding_rsvp 
  FOR SELECT USING (true);

CREATE POLICY "Allow public delete" ON wedding_rsvp 
  FOR DELETE USING (true);

-- Wishes policies
CREATE POLICY "Allow public insert wishes" ON wedding_wishes 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read wishes" ON wedding_wishes 
  FOR SELECT USING (true);

CREATE POLICY "Allow public delete wishes" ON wedding_wishes 
  FOR DELETE USING (true);
