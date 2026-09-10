CREATE TABLE IF NOT EXISTS giee_page_views (
  day date NOT NULL,
  path text NOT NULL,
  locale text NOT NULL,
  views bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path, locale),
  CHECK (path = '/giee' OR path LIKE '/giee/%'),
  CHECK (locale IN ('en', 'fr')),
  CHECK (views >= 0)
);
