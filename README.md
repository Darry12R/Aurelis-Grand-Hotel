# AURELIS GRAND HOTEL — Maison Aurelis

Experiencia gastronómica ficticia para demostración y portafolio. Diseñada con una dirección editorial oscura, serif Cormorant Garamond, Inter y fotografías originales generadas por IA.

## Ejecutar localmente

Requiere Node.js 20 o posterior. No requiere instalar dependencias.

```sh
npm start
```

Abrir `http://127.0.0.1:4173`. La página específica de servicio en habitación está en `/room-service`.

## Estructura

- `dist/js/components.js`: Header, Hero, RestaurantIntro, MenuCategories, MenuCard, Experiences, Reservations, Chef, WineCellar, Gallery, RoomService, PrivateEvents, Hotel, Testimonials y Footer.
- `dist/js/dialogs.js`: modales, carrito, checkout, reservas, formularios y confirmaciones.
- `dist/js/data.js`: 28 productos, categorías, experiencias, vinos y horarios ficticios.
- `dist/js/state.js`: estado local, persistencia, precios, escape de contenido y utilidades de interfaz.
- `dist/js/i18n.js`: traducción ES/EN de la interfaz y contenido editorial principal.
- `dist/js/app.js`: navegación, eventos y coordinación de componentes.
- `dist/styles.css`: sistema visual, responsive y preferencias de movimiento reducido.
- `dist/assets`: fotografías WebP originales, optimizadas para la web.

## Flujos

Carta con búsqueda instantánea, filtros, favoritos, disponibilidad simulada, ingredientes y alérgenos. Carrito editable con cantidades e instrucciones y servicio del 10%. Checkout de cuatro etapas con room service, recogida y servicio en mesa; métodos de pago simulados. Reservas de mesa, solicitudes de experiencias y eventos, desayuno programado, galería ampliable, concierge con respuestas locales y sommelier basado en reglas.

El perfil de invitado permite consultar los pedidos y solicitudes guardados en este navegador. El apartado de privacidad permite borrar los datos locales.

## Límites intencionados de la demostración

No existe backend, cuenta de usuario real, inventario en tiempo real, notificaciones, mensajería WhatsApp, pasarela bancaria ni hotel operativo. El número telefónico es de demostración. No se envían los formularios ni se realizan cargos. Los datos no se sincronizan entre dispositivos. El seguimiento del pedido avanza según el tiempo transcurrido de la simulación.

Las marcas, chef, vinos y testimonios son ficticios. Las fotografías son interpretaciones generadas por IA; los menús degustación usan imágenes representativas. Los nombres gastronómicos franceses y las denominaciones de platos se conservan en el selector de idioma. Google Fonts requiere conexión; existen fuentes locales de respaldo.

Para conectar una API, sustituir las operaciones de `state.js` y los controladores de envío en `app.js` por servicios autenticados. Validar nuevamente los formularios en el servidor, implementar disponibilidad, pagos, gestión de consentimiento y notificaciones antes de cualquier uso comercial real.

## Comprobación

`npm run check` revisa sintaxis JavaScript. Las verificaciones de navegador cubren anchos entre 360 y 1920 px, búsqueda, filtros, persistencia, edición del carrito, cálculo del 10%, checkout, reservas, experiencias, eventos, desayuno, galería, sommelier y teclado. Informes en `qa/`.

## Fotografías

Generadas con la herramienta integrada `image_gen`. Los prompts originales se conservan en `art-direction/`. Los activos finales se encuentran en `dist/assets/`.
