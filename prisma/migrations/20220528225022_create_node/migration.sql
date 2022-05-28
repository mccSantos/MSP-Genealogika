-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    CONSTRAINT "Link_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
