# Relatos de Papel

**Relatos de Papel** es una aplicación web para una librería en línea, diseñada para facilitar la compra de libros desde cualquier lugar. Los usuarios pueden registrarse, buscar libros, gestionar su carrito y realizar pagos de manera segura. La plataforma también ofrece un historial de pedidos y la opción de interactuar con otros lectores a través de reseñas.

## Descripción

Relatos de Papel se adapta a los nuevos hábitos de consumo literario mediante una plataforma intuitiva y accesible desde diversos dispositivos. Los usuarios pueden:

- Buscar libros por diversos criterios.
- Añadir libros al carrito y gestionarlo de manera intuitiva.
- Realizar pagos seguros a través de múltiples métodos.
- Ver historial de pedidos y rastrear envíos.
- Participar en la comunidad mediante reseñas moderadas.

La aplicación está optimizada para diferentes dispositivos y asegura la protección de los datos de los usuarios. Además, está diseñada para soportar altos volúmenes de tráfico y crecimiento escalable.

## Características

- Búsqueda y filtrado de libros.
- Carrito de compras y gestión de pagos.
- Funcionalidad de historial de pedidos.
- Soporte de múltiples idiomas.
- Accesibilidad y seguridad de datos.
- Optimización para dispositivos móviles y escritorios.

## Tecnologías

- **Frontend:** React, React Bootstrap, Vite
- **Backend:** (Indicar tecnología de backend si aplica, por ejemplo, Node.js, Express, etc.)
- **Almacenamiento:** Context API para manejo del carrito de compras.

## Estructura del Proyecto

```plaintext
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── Landing.gif
│   │   └── react.svg
│   ├── components
│   │   ├── BookDetails.jsx
│   │   ├── Cards.jsx
│   │   ├── Carousels.jsx
│   │   ├── Cart.jsx
│   │   ├── CartContext.jsx
│   │   ├── Header.jsx
│   │   └── LandingPage.jsx
│   ├── main.jsx
│   ├── styles
│   │   └── styles.css
│   └── views
│       ├── CartDetails.jsx
│       ├── Criptografia.jsx
│       ├── DetailsBook.jsx
│       ├── Javascript.jsx
│       ├── Landing.jsx
│       ├── Main.jsx
│       └── Python.jsx
└── vite.config.js
```

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
    git clone https://github.com/Guerrero9606/Front-RelatosPapel.git

2. Accede a la carpeta del proyecto:

    cd my-app

3. Instala las dependencias:

    npm install

4. Ejecuta el proyecto en modo desarrollo:

    npm run dev

5. Abre tu navegador y navega a http://localhost:5173.


## Scripts
**npm run dev:** Inicia el servidor en modo desarrollo.
**npm run build:** Crea una versión optimizada para producción.
**npm run preview:** Muestra una vista previa de la versión de producción.

## Contribuir
¡Las contribuciones son bienvenidas! Si tienes una idea para mejorar la aplicación o encuentras un error, por favor abre un issue o envía un pull request.