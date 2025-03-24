import { CartItem } from "../models/CartItem";

export interface ICartAction {
  type: CartActionType;
  payload: CartItem;
}

export enum CartActionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  CLEAR_CART,
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
  const { payload, type } = action;

  switch (type) {
    case CartActionType.ADD_ITEM: {
      const existingItem = cart.find((item) => item.product.id === payload.product.id);
      if (!existingItem) return [...cart, payload];
      return cart.map((item) =>
        item.product.id === payload.product.id ? { ...item, quantity: item.quantity + payload.quantity } : item
      );
    }
    // case CartActionType.REMOVE_ITEM:

    case CartActionType.CHANGE_QUANTITY:
      return cart.map((item) =>
        item.product.id === payload.product.id ? { ...item, quantity: payload.quantity } : item
      );
    // case CartActionType.CLEAR_CART:
    default:
      return cart;
  }
};
