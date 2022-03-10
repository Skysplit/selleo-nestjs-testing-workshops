import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBasicEntities1646914624333 implements MigrationInterface {
  name = 'addBasicEntities1646914624333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "bio" text NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a88ba1d20a409372afcbf52247" ON "author" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6e3bec87718f9ac9796fd30b5" ON "author" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd183604b9c828c0bdd92cafab" ON "book" ("isbn") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c10a44a29ef231062f22b1b7ac" ON "book" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a92af049585adb6b2609058e88" ON "book" ("subtitle") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."supply_status_enum" AS ENUM('available', 'lost', 'borrowed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "supply" ("id" SERIAL NOT NULL, "status" "public"."supply_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bookId" integer, CONSTRAINT "PK_11dcdc2def0eb6d10ed3ae0180d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a41a0842593d5b7fd87e5c6b8c" ON "supply" ("status") `,
    );
    await queryRunner.query(
      `CREATE TABLE "book_author" ("bookId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_9a862048014a06fa7c62aaf7970" PRIMARY KEY ("bookId", "authorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_56b8cdc80ea78d03dcece601ff" ON "book_author" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4979ade189c87f2db1e0e9c213" ON "book_author" ("authorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "supply" ADD CONSTRAINT "FK_4d5485440a0369f1b6a6d13288a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_author" ADD CONSTRAINT "FK_56b8cdc80ea78d03dcece601fff" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_author" ADD CONSTRAINT "FK_4979ade189c87f2db1e0e9c213c" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_author" DROP CONSTRAINT "FK_4979ade189c87f2db1e0e9c213c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_author" DROP CONSTRAINT "FK_56b8cdc80ea78d03dcece601fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supply" DROP CONSTRAINT "FK_4d5485440a0369f1b6a6d13288a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4979ade189c87f2db1e0e9c213"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_56b8cdc80ea78d03dcece601ff"`,
    );
    await queryRunner.query(`DROP TABLE "book_author"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a41a0842593d5b7fd87e5c6b8c"`,
    );
    await queryRunner.query(`DROP TABLE "supply"`);
    await queryRunner.query(`DROP TYPE "public"."supply_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a92af049585adb6b2609058e88"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c10a44a29ef231062f22b1b7ac"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bd183604b9c828c0bdd92cafab"`,
    );
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f6e3bec87718f9ac9796fd30b5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a88ba1d20a409372afcbf52247"`,
    );
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
