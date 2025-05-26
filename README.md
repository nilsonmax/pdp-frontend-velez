# 🛍️ PDP - Página de Detalle de Producto

Este proyecto es una prueba técnica para la vacante de **Analista Frontend**, centrada en construir una Página de Detalle de Producto (PDP) profesional utilizando React y TypeScript. El enfoque está en la experiencia de usuario, diseño visual y funcionalidad realista de e-commerce.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React + TypeScript
- 🎨 Sass (SCSS)
- 🛒 Context API + LocalStorage para carrito persistente
- 🌐 Fetch API para consumo de datos

---

## ✨ Funcionalidades implementadas

- Visualización de todas las imágenes del producto con miniaturas
- Galería con navegación entre imágenes (← →)
- Selección interactiva de talla y color
- Visualización de precio original y con descuento
- Validación antes de agregar al carrito
- Carrito de compras:
  - Sumar/restar cantidad
  - Eliminar productos
  - Cálculo automático de total
- Componentes reutilizables:
  - Acordeón para descripción y características técnicas
- Toasts visuales para feedback de usuario

---

## 🔗 Demo en producción
👉 [Ver deploy en Vercel]()


## 📂 Estructura del proyecto

├── components/
│   └── Accordion.tsx
├── context/
│   └── CartContext.tsx
├── styles/
│   ├── ProductPage.scss
│   ├── CartSidebar.scss
│   └── Accordion.scss
├── types/
│   └── product.ts
├── App.tsx
├── main.tsx
└── README.md

---

## 👨‍💻 Autor
Nilson Max
Frontend Developer
GitHub: @tu-usuario

---

## 📦 Cómo ejecutar el proyecto localmente

```bash
git clone https://github.com/nilsonmax/pdp-frontend-velez.git
cd pdp-velez
npm install
npm run dev