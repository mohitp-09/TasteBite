import React, { createContext, useContext, useReducer } from "react";

const CartDispatchContext = createContext();
const CartStateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Calculate totalPrice in the reducer to avoid issues with price duplication
      const totalPrice = action.price * action.qty;
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          totalPrice,  // Store the calculated total price
        },
      ];

    case "REMOVE":
      // Use `id` to consistently remove the item from the cart
      // return state.filter((item) => item.id !== action.id);
      return state.filter((item) => item.id !== action.payload);
    
    case "DROP":
      let empArray = []
      return empArray
      
    default:
      console.log("Error in Reducer");
      return state;
  }
};

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
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
