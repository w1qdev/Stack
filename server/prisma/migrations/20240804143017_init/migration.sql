-- CreateTable
CREATE TABLE "_FriendRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FriendRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FriendRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendRelation_AB_unique" ON "_FriendRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendRelation_B_index" ON "_FriendRelation"("B");
