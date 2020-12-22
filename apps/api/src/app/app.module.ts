import { Module } from "@nestjs/common";
import { OrmModule } from "@mmcxii/orm";
import { AuthorModule } from "../modules/author/author.module";
import { BookModule } from "../modules/book/book.module";

@Module({
  imports: [OrmModule, AuthorModule, BookModule],
})
export class AppModule {}
