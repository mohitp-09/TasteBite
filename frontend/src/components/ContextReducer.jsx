import React, { createContext, useContext, useReducer } from "react";

const CartDispatchContext = createContext();
const CartStateContext = createContext();

const reducer = (state, action) =>{
  switch(action.type){
    case "ADD":
      // console.log(action.id);
      return [...state,{id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size}];

    default: 
      console.log("Error in Reducer");
      
  }
}

export const CartProvider = ({ children  }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
