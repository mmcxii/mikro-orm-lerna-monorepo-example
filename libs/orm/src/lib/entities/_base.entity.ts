import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  abstract: true,
})
export abstract class BaseEntity {
  @PrimaryKey()
  public id: number;

  @Property({
    onCreate: () => new Date(),
  })
  public createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  public updatedAt: Date = new Date();

  @Property({
    nullable: true,
  })
  public archivedAt: Date = null;
}
