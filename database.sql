CREATE TABLE "to-do-list" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(80) NOT NULL,
  "priority" INTEGER CHECK ("priority" >= 1 AND "priority" <= 3),
  "due_date" DATE,
  "completion" BOOLEAN DEFAULT FALSE);

-- DROP TABLE "to-do-list";

SELECT * FROM "to-do-list" ORDER BY "priority" ASC;