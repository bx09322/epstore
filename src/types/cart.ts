export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
