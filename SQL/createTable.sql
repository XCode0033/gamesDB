

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title  VARCHAR(100) DEFAULT 'UNTITLED',
    genre  VARCHAR(30) DEFAULT 'NONE',
    rating  INT CHECK (rating <= 5),
    description  TEXT
)