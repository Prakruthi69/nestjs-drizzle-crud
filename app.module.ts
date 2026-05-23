CREATE TABLE IF NOT EXISTS "items" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text,
  "price" integer DEFAULT 0 NOT NULL,
  "in_stock" boolean DEFAULT true NOT NULL,
  "category" varchar(100),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
