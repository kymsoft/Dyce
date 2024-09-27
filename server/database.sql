CREATE DATABASE dyce;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL, 
    password VARCHAR(225) NOT NULL,
    phonenumber NUMERIC(11, 0) 
);

CREATE TABLE cards(
    card_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL, 
    card_code TEXT,
    card_number BYTEA NOT NULL,
    expiry_date DATE NOT NULL,
    cvv BYTEA NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_user
      FOREIGN KEY (user_id)
      REFERENCES users(user_id)  
      ON DELETE CASCADE
);

CREATE TABLE verification_token (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMP NOT NULL,
  CONSTRAINT unique_email_token UNIQUE (email, token)
);

CREATE TABLE passwordreset_token (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMP NOT NULL
);
