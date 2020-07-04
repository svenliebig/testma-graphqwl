# Migration `20200703114846-hinzufuegen-von-version`

This migration has been generated by Sven Liebig at 7/3/2020, 11:48:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Version" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"version" TEXT NOT NULL  )

CREATE TABLE "quaint"."new_Link" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"description" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"postedById" INTEGER   ,"url" TEXT NOT NULL  ,FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Link" ("createdAt", "description", "id", "postedById", "url") SELECT "createdAt", "description", "id", "postedById", "url" FROM "quaint"."Link"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Link";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Link" RENAME TO "Link";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200703005734-add-user-model..20200703114846-hinzufuegen-von-version
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource sb {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -21,5 +21,10 @@
   name      String
   email     String   @unique
   password  String
   links     Link[]
+}
+
+model Version {
+  id        Int      @id @default(autoincrement())
+  version   String
 }
```

