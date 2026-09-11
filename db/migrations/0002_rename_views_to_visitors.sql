-- The client now suppresses repeat sends for a path it already reported today,
-- so this column counts one visitor per path, locale, and UTC day -- not raw
-- page views. Rename it so the name cannot outlive the meaning.
ALTER TABLE "page_views" RENAME COLUMN "views" TO "visitors";
--> statement-breakpoint

ALTER TABLE "page_views" RENAME CONSTRAINT "page_views_views_non_negative"
  TO "page_views_visitors_non_negative";
