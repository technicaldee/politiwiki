-- Add state column to politicians table
ALTER TABLE politicians ADD COLUMN state VARCHAR(255);

-- Update existing records with state information
UPDATE politicians SET state = 'Lagos' WHERE id = '00000000-0000-0000-0000-000000000001';
UPDATE politicians SET state = 'Anambra' WHERE id = '00000000-0000-0000-0000-000000000002';
UPDATE politicians SET state = 'Adamawa' WHERE id = '00000000-0000-0000-0000-000000000003';
UPDATE politicians SET state = 'Lagos' WHERE id = '00000000-0000-0000-0000-000000000004';
UPDATE politicians SET state = 'Rivers' WHERE id = '00000000-0000-0000-0000-000000000005'; 