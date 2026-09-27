# Aurelis: pedidos y reservas de demostración

Correcciones preparadas el 26 de septiembre de 2026; entrega revisada el 27. El informe conjunto distingue las pruebas locales del alojamiento público.

Se conservan fotografías, carta, carrito, reservas, idiomas y navegación. Avisos y confirmaciones indican que se trata de simulaciones: no hay hotel operativo, reserva, pedido, cobro ni correo real. Se pide utilizar datos ficticios.

Carrito, favoritos, pedidos, reservas e idioma existen solo en memoria durante la visita. Recargar reinicia la simulación. El código nuevo no lee, escribe ni elimina localStorage. Si alguien usó una versión anterior, sus entradas aur-cart, aur-favorites, aur-orders, aur-reservations y aur-lang pueden seguir en su propio navegador. Para eliminarlas puede borrar los datos de este sitio desde su navegador; la actualización no las borra automáticamente.

La CSP bloquea conexiones de datos, envíos de formularios, marcos y estilos inline. Las fotografías se sirven desde la demo; Google Fonts sigue siendo un proveedor externo de fuentes. El alojamiento y ese proveedor reciben solicitudes técnicas. Noindex no controla el acceso ni retira por sí solo páginas ya indexadas.

## Verificación

npm run check y las siete pruebas de npm test aprobados. Se verificaron estado temporal, independencia entre visitas, ausencia de almacenamiento persistente, escape de contenido, textos de simulación y cabeceras. La reserva se comprobó en navegador local con datos ficticios y sin envío externo, también en móvil a 390 px.

Ejecutar npm start y abrir http://127.0.0.1:4173. Aquí dist/ contiene los archivos fuente publicados: se conserva y no debe excluirse como si fuera una compilación desechable.

El historial de autoría o generación de imágenes no sustituye una comprobación de derechos. Las licencias y la compatibilidad del alojamiento continúan pendientes. Los informes antiguos de qa/ corresponden a versiones anteriores.
