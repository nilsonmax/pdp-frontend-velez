import { useEffect, useState } from "react";
import "../styles/ProductPage.scss";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

type ColorOption = {
  name: string;
  value: string;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // simulacion de tallas
  // const simulatedSizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  //Simular los colores
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const { dispatch } = useCart();

  // activar navegacion
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  //efecto fade para dar un toque sutil a la galeria
  const [fade, setFade] = useState(false);

  // mensajes
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning";
  } | null>(null);
  // const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize || !selectedColor) {
      showToast(
        "Por favor selecciona una talla y un color antes de agregar al carrito.",
        "warning"
      );
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.productId,
        productName: product.productName,
        image: product.items?.[0]?.images?.[0]?.imageUrl || "",
        price:
          product.items[0].sellers[0].commertialOffer.Price ||
          product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount ||
          0,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      },
    });
    showToast("Producto agregado al carrito 🛒", "success");
  };

  useEffect(() => {
    fetch(
      "https://api-prueba-frontend-production.up.railway.app/api/products/productId/125829257"
    )
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
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api-prueba-frontend-production.up.railway.app/api/products?ft=tenis"
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setRelatedProducts(data.slice(0, 5));
        } else {
          console.warn("No se recibieron productos válidos.");
        }
      } catch (err) {
        console.error("Error al cargar productos relacionados:", err);
      }
    };

    fetchProducts();
  }, []);

  if (!product) {
    return <div className="product-page">Cargando producto...</div>;
  }

  const productImages = product.items?.[0]?.images || [];
  const Sizes = product.items?.[0]?.Talla || [];
  const currentImage = productImages[activeImageIndex]?.imageUrl;

  // Mostrar colores disponibles
  const simulatedColor = product.items?.[0]?.Color || [];
  const colorMap: Record<string, string> = {
    Café: "#3d2217",
    Negro: "#000000",
    Blanco: "#ffffff",
    Gris: "#555555",
    Vinotinto: "#820000",
  };

  const handleColorClick = (colorValue: string) => {
    setSelectedColor((prev) => (prev === colorValue ? null : colorValue));
  };

  // const getColorName = (colorValue: string): string => {
  //   const entry = Object.entries(colorMap).find(
  //     ([, value]) => value === colorValue
  //   );
  //   return entry ? entry[0] : "Otro";
  // };

  const colors: ColorOption[] = simulatedColor
    .map((colorName: string) => {
      const value = colorMap[colorName];
      if (!value) return null; // Ignora colores no definidos
      return { name: colorName, value };
    })
    .filter(Boolean) as ColorOption[]; // Elimina los nulos

  console.log("Producto:", Sizes); // 👈 Aquí ves la estructura del objeto

  return (
    <div className="product-page">
      <div className="product-page-layout">
        <div className="image-gallery">
          <div className="main-image">
            <button
              className="nav left"
              onClick={() => {
                setFade(true);
                setActiveImageIndex((prev) =>
                  prev > 0 ? prev - 1 : productImages.length - 1
                );
                setTimeout(() => {
                  setFade(false);
                }, 400);
              }}
            >
              ‹
            </button>

            <img
              src={currentImage}
              alt={`Imagen ${activeImageIndex + 1}`}
              className={fade ? "fade" : ""}
            />

            <button
              className="nav right"
              onClick={() => {
                setFade(true);
                setActiveImageIndex(
                  (prev) => (prev + 1) % productImages.length
                );
                setTimeout(() => {
                  setFade(false);
                }, 400);
              }}
            >
              ›
            </button>
          </div>

          <div className="thumbnails">
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={`Miniatura ${idx + 1}`}
                className={idx === activeImageIndex ? "active" : ""}
                onClick={() => {
                  setFade(true);
                  setActiveImageIndex(idx);
                  setTimeout(() => {
                    setFade(false);
                  }, 400);
                }}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.productName}</h1>
          <div className="price">
            {product.items[0].sellers[0].commertialOffer
              .PriceWithoutDiscount && (
              <p className="full">
                $
                {
                  product.items[0].sellers[0].commertialOffer
                    .PriceWithoutDiscount
                }
              </p>
            )}
            {product.items[0].sellers[0].commertialOffer.Price && (
              <p className="discount">
                ${product.items[0].sellers[0].commertialOffer.Price}
              </p>
            )}
          </div>
          <p className="brand">Marca: {product.brand}</p>
          <p className="reference">Ref: {product.productReference}</p>

          <div className="sizes">
            <p>Tallas disponibles:</p>
            <div className="size-options">
              {Sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() =>
                    setSelectedSize((prev) => (prev === size ? null : size))
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ----------------------------- */}
          <div className="color-selector">
            <p>Colores disponibles:</p>
            <div className="color-options">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`color-box ${
                    selectedColor === color.value ? "active" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorClick(color.value)}
                  aria-label={color.name}
                />
              ))}
            </div>

            {/* {selectedColor && (
              <p>Color seleccionado: {getColorName(selectedColor)}</p>
            )} */}
          </div>

          {/* ----------------------------- */}

          <button className="add-to-cart" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="related-products">
        <h2>Productos relacionados</h2>
        <div className="related-grid">
          {relatedProducts.map((prod) => (
            <div key={prod.productId} className="related-card">
              <div className="image-wrapper">
                <img
                  src={prod.items?.[0]?.images?.[0]?.imageUrl || ""}
                  alt={prod.productName}
                />
              </div>
              <div className="info">
                <p className="title">{prod.productName}</p>
                <p className="brand">{prod.brand}</p>
                <p className="price">
                  {prod.items[0].sellers[0].commertialOffer.Price != null
                    ? `$${prod.items[0].sellers[0].commertialOffer.Price}`
                    : prod.items[0].sellers[0].commertialOffer
                        .PriceWithoutDiscount != null
                    ? `$${prod.items[0].sellers[0].commertialOffer.PriceWithoutDiscount}`
                    : "Sin precio"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" && "✅"}
          {toast.type === "warning" && "⚠️"}
          {toast.message}
        </div>
      )}
    </div>
  );
}
