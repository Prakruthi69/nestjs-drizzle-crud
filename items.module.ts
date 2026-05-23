import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import * as schema from '../db/schema';
import { CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<schema.Item[]> {
    return this.db.select().from(schema.items);
  }

  async findOne(id: number): Promise<schema.Item> {
    const result = await this.db
      .select()
      .from(schema.items)
      .where(eq(schema.items.id, id));

    if (!result.length) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return result[0];
  }

  async create(dto: CreateItemDto): Promise<schema.Item> {
    const [newItem] = await this.db
      .insert(schema.items)
      .values({
        name: dto.name,
        description: dto.description ?? null,
        price: dto.price,
        inStock: dto.inStock ?? true,
        category: dto.category ?? null,
      })
      .returning();
    return newItem;
  }

  async update(id: number, dto: UpdateItemDto): Promise<schema.Item> {
    await this.findOne(id);

    const [updated] = await this.db
      .update(schema.items)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(schema.items.id, id))
      .returning();

    return updated;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.db.delete(schema.items).where(eq(schema.items.id, id));
    return { message: `Item ${id} deleted successfully` };
  }
}
