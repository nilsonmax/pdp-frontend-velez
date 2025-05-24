export interface Product {
  productId: string;
  productName: string;
  brand: string;
  productReference: string;
  items: {
    images: {
      imageUrl: string;
    }[];
  }[];
  price: number;
  discountedPrice: number;
  color?: string;
  sizes?: string[];
}