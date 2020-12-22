import { OrmModule } from "@mmcxii/orm";
import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";

@Module({
  imports: [OrmModule],
  controllers: [AuthorController],
})
export class AuthorModule {}
