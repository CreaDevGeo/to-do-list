CREATE TABLE "to-do-list" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(80) NOT NULL,
  "priority" INTEGER CHECK ("priority" >= 1 AND "priority" <= 3),
  "end-date" DATE,
  "completed" BOOLEAN DEFAULT FALSE NOT NULL
);