CREATE TABLE "analytics_sections" (
	"slug" text PRIMARY KEY NOT NULL,
	"root_path" text NOT NULL,
	"retention_days" integer DEFAULT 90 NOT NULL,
	CONSTRAINT "analytics_sections_root_path_unique" UNIQUE("root_path"),
	CONSTRAINT "analytics_sections_root_path_shape" CHECK ("analytics_sections"."root_path" ~ '^/[a-z0-9-]+$'),
	CONSTRAINT "analytics_sections_retention_positive" CHECK ("analytics_sections"."retention_days" > 0)
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"day" date NOT NULL,
	"section" text NOT NULL,
	"path" text NOT NULL,
	"locale" text NOT NULL,
	"views" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "page_views_day_section_path_locale_pk" PRIMARY KEY("day","section","path","locale"),
	CONSTRAINT "page_views_views_non_negative" CHECK ("page_views"."views" >= 0)
);
--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_section_analytics_sections_slug_fk" FOREIGN KEY ("section") REFERENCES "public"."analytics_sections"("slug") ON DELETE no action ON UPDATE no action;