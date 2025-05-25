export interface Product {
  productId: string;
  productName: string;
  brand: string;
  productReference: string;
  items: {
    images: {
      imageUrl: string;
    }[];
    Talla:string[];
    Color:string[];
    sellers: {
      commertialOffer: {
        Price: number;
        PriceWithoutDiscount: number;
      };
    }[];
  }[];
  price: number;
  discountedPrice: number;
}