import React, { createContext, useContext, useReducer } from "react";

// Contexts for Cart State and Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      // Initialize cart state with data from the backend
      return action.payload;

    case "ADD":
      const totalPrice = action.price * action.qty;
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          totalPrice,
        },
      ];

    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? {
              ...item,
              qty: Math.max(1, item.qty + action.payload.qty), // Prevent quantity from dropping below 1
              totalPrice: Math.max(1, item.qty + action.payload.qty) * item.price,
            }
          : item
      );

    case "REMOVE":
      return state.filter(
        (item) => item.id !== action.payload.id || item.size !== action.payload.size
      );

    case "DROP":
      // Clear the entire cart
      return [];

    default:
      console.error("Unknown action type in reducer:", action.type);
      return state;
  }
};

// CartProvider to wrap components that need access to the cart state
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks for accessing cart state and dispatch
export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context;
};
