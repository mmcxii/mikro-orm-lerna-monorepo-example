import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Author, Book, BookTag, Publisher } from "./entities";
import { mikroOrmConfig } from "../mikro-orm.config";

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([Author, Book, BookTag, Publisher]),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
