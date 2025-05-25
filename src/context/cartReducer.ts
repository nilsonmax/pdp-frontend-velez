export interface CartItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "LOAD_CART"; payload: CartItem[] };

export const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.find((item) => item.productId === action.payload.productId);
      if (exists) {
        return state.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.productId !== action.payload);

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};