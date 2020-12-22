import { Collection, Entity, Enum, OneToMany, Property } from "@mikro-orm/core";
import { Book } from "./book.entity";
import { BaseEntity } from "./_base.entity";

@Entity()
export class Publisher extends BaseEntity {
  @Property()
  name: string;

  @OneToMany(() => Book, (b) => b.publisher)
  books = new Collection<Book>(this);

  @Enum()
  type: PublisherType;

  constructor(name: string, type = PublisherType.LOCAL) {
    super();

    this.name = name;
    this.type = type;
  }
}

export enum PublisherType {
  LOCAL = "local",
  GLOBAL = "global",
}
