import { useCart } from "../context/CartContext";
import "../styles/CartSidebar.scss";
import { useState } from "react";

export default function CartSidebar() {
  const { cart, dispatch } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <>
      <div className="cart-icon" onClick={() => setOpen(!open)}>
        🛒 {cart.length}
      </div>

      {open && (
          <div className={`cart-overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)}>
    <div className={`cart-sidebar ${!open ? "cart-sidebar-hidden" : ""}`} onClick={(e) => e.stopPropagation()}>
  
          <h2>Carrito de compras</h2>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.productId}>
                    <img src={item.image} alt={item.productName} />
                    <div>
                      <p>{item.productName}</p>
                      <p>${item.price} x {item.quantity}</p>
                      {/* <p>Talla: {item.size}</p>
                      <p>Color: <span className="color-preview" style={{ backgroundColor: item.color }}></span></p> */}

                      <button onClick={() => removeFromCart(item.productId)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn">Finalizar compra</button>
            </>
          )}
        </div>
    </div>
      )}
    </>
  );
}