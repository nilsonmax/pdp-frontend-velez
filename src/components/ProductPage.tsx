import { useEffect, useState } from "react";
import "../styles/ProductPage.scss";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.productId,
        productName: product.productName,
        image: product.items?.[0]?.images?.[0]?.imageUrl || "",
        price: product.discountedPrice || product.price || 0,
        quantity: 1,
      },
    });
  };

  useEffect(() => {
    fetch("https://api-prueba-frontend-production.up.railway.app/api/products/productId/125829257")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else {
          console.error("No se encontró producto válido en la API.");
        }
      })
      .catch((err) => console.error("Error al cargar producto:", err));
  }, []);

  useEffect(() => {
    fetch("https://api-prueba-frontend-production.up.railway.app/api/products?ft=tenis")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelatedProducts(data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error al cargar productos relacionados:", err));
  }, []);

  if (!product) {
    return <div className="product-page">Cargando producto...</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.productName}</h1>
      <p>Marca: {product.brand}</p>
      <p>Referencia: {product.productReference}</p>

      <div className="images">
        {product.items?.[0]?.images?.map((img, idx) => (
          <img
            key={idx}
            src={img.imageUrl}
            alt={`Imagen del producto ${product.productName}`}
          />
        ))}
      </div>

      <p>Color: {product.color || "No especificado"}</p>

      <div className="sizes">
        {product.sizes?.length ? (
          product.sizes.map((size) => (
            <button key={size}>{size}</button>
          ))
        ) : (
          <p>No hay tallas disponibles</p>
        )}
      </div>

      <div className="price">
        {product.price && <p className="full">${product.price}</p>}
        {product.discountedPrice && (
          <p className="discount">${product.discountedPrice}</p>
        )}
      </div>

      <button className="add-to-cart" onClick={handleAddToCart}>
        Agregar al carrito
      </button>

      {/* Productos relacionados */}
      <div className="related-products">
        <h2>Productos relacionados</h2>
        <div className="related-list">
          {relatedProducts.map((prod) => (
            <div key={prod.productId} className="related-card">
              <img
                src={prod.items?.[0]?.images?.[0]?.imageUrl || ""}
                alt={`Imagen de ${prod.productName}`}
              />
              <p>{prod.productName}</p>
              <p className="related-brand">{prod.brand}</p>
              <p className="related-price">
                {prod.discountedPrice
                  ? `$${prod.discountedPrice}`
                  : prod.price
                  ? `$${prod.price}`
                  : "Sin precio"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
