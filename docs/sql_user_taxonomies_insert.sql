CREATE TABLE IF NOT EXISTS user_taxonomies (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  taxonomy_id integer REFERENCES taxonomies
);

INSERT INTO user_taxonomies (user_email, taxonomy_id)
VALUES
    (
    'bicantester@gmail.com',
    1
    ),
    (
    'bicantester@gmail.com',
    3
    ),
    (
    'bicantester@gmail.com',
    4
    );