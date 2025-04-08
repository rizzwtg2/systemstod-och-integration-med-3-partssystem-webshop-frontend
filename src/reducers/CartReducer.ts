import { CartItem } from "../models/CartItem";

export interface ICartActionWithPayload {
  type: CartActionType.ADD_ITEM | CartActionType.REMOVE_ITEM | CartActionType.CHANGE_QUANTITY;
  payload: CartItem;
}

export interface ICartActionWithoutPayload {
  type: CartActionType.CLEAR_CART;
}

export type ICartAction = ICartActionWithPayload | ICartActionWithoutPayload;
export enum CartActionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  CLEAR_CART,
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
  const { type } = action;

  switch (type) {
    case CartActionType.ADD_ITEM: {
      const existingItem = cart.find((item) => item.product.id === action.payload.product.id);
      if (!existingItem) return [...cart, action.payload];
      return cart.map((item) =>
        item.product.id === action.payload.product.id
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      );
    }
    case CartActionType.REMOVE_ITEM:
      return cart.filter((item) => item.product.id !== action.payload.product.id);

    case CartActionType.CHANGE_QUANTITY:
      return cart.map((item) =>
        item.product.id === action.payload.product.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case CartActionType.CLEAR_CART:
      return [];
    default:
      return cart;
  }
};
