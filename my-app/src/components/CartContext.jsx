import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Reducir el carrito con las acciones correspondientes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.some((item) => item.id === action.payload.id)) {
        console.log('Libro ya existe en el carrito:', action.payload);
        return state; // Evitar duplicados
      }
      console.log('Libro agregado al carrito:', action.payload);
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Intentamos cargar el carrito desde sessionStorage si existe
  const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];

  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  // Persistir el carrito en sessionStorage cuando se actualice el estado
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // Guardamos el carrito en el sessionStorage cada vez que cambie

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);