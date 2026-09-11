-- Seed the measured sections. Collection scope is a privacy control, so it
-- lives in data the database enforces rather than in application code alone.
INSERT INTO "analytics_sections" ("slug", "root_path", "retention_days")
VALUES ('giee', '/giee', 90)
ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint

-- A CHECK constraint cannot consult another table, so the "path must sit
-- inside its section" rule is a trigger. analytics_sections_root_path_shape
-- keeps root_path free of LIKE metacharacters, so a plain prefix match is safe.
CREATE OR REPLACE FUNCTION "analytics_assert_path_in_section"()
RETURNS trigger AS $$
DECLARE
  "section_root" text;
BEGIN
  SELECT "root_path" INTO "section_root"
  FROM "analytics_sections"
  WHERE "slug" = NEW."section";

  IF "section_root" IS NULL
     OR (NEW."path" <> "section_root"
         AND NEW."path" NOT LIKE "section_root" || '/%') THEN
    RAISE EXCEPTION 'page_views.path is outside its section';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint

DROP TRIGGER IF EXISTS "page_views_path_in_section" ON "page_views";
--> statement-breakpoint

CREATE TRIGGER "page_views_path_in_section"
BEFORE INSERT OR UPDATE ON "page_views"
FOR EACH ROW EXECUTE FUNCTION "analytics_assert_path_in_section"();
--> statement-breakpoint

-- Carry over counters from the single-section table this schema replaces.
-- Rows are already aggregates, so the copy is a plain sum per key.
-- Guarded by a DO block because a plain SELECT against a missing table fails
-- at parse time, and databases created after this schema never had it.
DO $guard$
BEGIN
  IF to_regclass('public.giee_page_views') IS NOT NULL THEN
    EXECUTE $migrate$
      INSERT INTO "page_views" ("day", "section", "path", "locale", "views")
      SELECT "day", 'giee', "path", "locale", SUM("views")
      FROM "giee_page_views"
      GROUP BY "day", "path", "locale"
      ON CONFLICT ("day", "section", "path", "locale")
      DO UPDATE SET "views" = "page_views"."views" + EXCLUDED."views"
    $migrate$;
  END IF;
END
$guard$;
--> statement-breakpoint

DROP TABLE IF EXISTS "giee_page_views";
