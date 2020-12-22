import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { Book } from "./book.entity";
import { BaseEntity } from "./_base.entity";

@Entity()
export class BookTag extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany(() => Book, (b) => b.tags)
  books: Collection<Book> = new Collection<Book>(this);

  constructor(name: string) {
    super();

    this.name = name;
  }
}
