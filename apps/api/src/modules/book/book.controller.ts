import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Book } from "@mmcxii/orm";
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

@Controller("book")
export class BookController {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>
  ) {}

  @Get()
  async find() {
    return await this.bookRepository.findAll(
      ["author"],
      { title: QueryOrder.DESC },
      20
    );
  }

  @Get(":id")
  async findOne(@Param() id: string) {
    const book = await this.bookRepository.findOne(
      {
        id: Number.parseInt(id, 10),
      },
      ["books"]
    );

    if (!book) {
      throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
    }

    return book;
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.title || !body.author) {
      throw new HttpException(
        "One of `title, author` is missing",
        HttpStatus.BAD_REQUEST
      );
    }

    const book = this.bookRepository.create({
      title: body.title,
      author: body.author,
    });

    this.bookRepository.persistAndFlush(book);

    return book;
  }

  @Put(":id")
  async update(@Param() id: string, @Body() body: any) {
    const book = await this.bookRepository.findOne({
      id: Number.parseInt(id, 10),
    });

    if (!book) {
      throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.persistAndFlush({ ...book, ...body });

    return book;
  }
}
