CREATE TABLE IF NOT EXISTS promo_content (
  id SERIAL PRIMARY KEY,
  image_base64 TEXT,
  title TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO promo_content (title, description) 
VALUES ('Cookies Homemade Fresh from Oven', 'Renyah di luar, lembut di dalam. Dibuat dengan butter asli tanpa pengawet.');