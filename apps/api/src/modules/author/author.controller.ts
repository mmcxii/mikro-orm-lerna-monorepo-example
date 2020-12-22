import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Author } from "@mmcxii/orm";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("author")
export class AuthorController {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>
  ) {}

  @Get()
  async find() {
    return await this.authorRepository.findAll(
      ["books"],
      { name: QueryOrder.DESC },
      20
    );
  }

  @Get(":id")
  async findOne(@Param() id: string) {
    const author = await this.authorRepository.findOne(
      {
        id: Number.parseInt(id, 10),
      },
      ["books"]
    );

    if (!author) {
      throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
    }

    return author;
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.name || !body.email) {
      throw new HttpException(
        "One of `name, email` is missing",
        HttpStatus.BAD_REQUEST
      );
    }

    const author = this.authorRepository.create({
      name: body.name,
      email: body.email,
    });

    await this.authorRepository.persistAndFlush(author);

    return author;
  }

  @Put(":id")
  async update(@Param() id: string, @Body() body: any) {
    const author = await this.authorRepository.findOne({
      id: Number.parseInt(id, 10),
    });

    if (!author) {
      throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
    }

    await this.authorRepository.persistAndFlush({ ...author, ...body });

    return author;
  }
}
