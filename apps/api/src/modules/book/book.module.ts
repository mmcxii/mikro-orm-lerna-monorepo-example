import { OrmModule } from "@mmcxii/orm";
import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";

@Module({
  imports: [OrmModule],
  controllers: [BookController],
})
export class BookModule {}
