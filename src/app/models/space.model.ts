export interface Product {
  name: string;
  tags: string;
}

export interface Space {
  id: number;
  name: string;
  city: string;
  state: string;
  spaceId: string;
  products: Product[];
}
