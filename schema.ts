export class CreateItemDto {
  name: string;
  description?: string;
  price: number;
  inStock?: boolean;
  category?: string;
}

export class UpdateItemDto {
  name?: string;
  description?: string;
  price?: number;
  inStock?: boolean;
  category?: string;
}
