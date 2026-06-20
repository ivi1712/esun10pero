# Juego es un 10 pero...

> Una página web simple, visual y optimizada para móvil para generar números del 1 al 10 con cuenta atrás, temas de iluminación y animaciones festivas.

## Vista general

Este proyecto está pensado para usarse en pantallas pequeñas, especialmente en móvil. La idea es simple: pulsas **Generar número**, haces la cuenta atrás, aparece un número grande y después puedes marcar si fue un acierto o un fallo.

## Tecnologías usadas

- **HTML5** para la estructura de la interfaz.
- **CSS3** para todo el diseño visual, animaciones y adaptaciones responsive.
- **JavaScript** para la lógica del generador, cuenta atrás, temas y efectos.
- **Bootstrap 5 por CDN** para apoyarse en estilos base de botones y componentes.
- **GitHub Pages** como destino de publicación estática.

## Flujo de uso

1. Abres la página.
2. Pulsas **Generar número**.
3. Se muestra una cuenta atrás de 3 segundos para poder colocar el móvil en la cabeza.
4. El número se revela en grande.
5. Puedes elegir **Número acertado** o **Número fallado**.
6. Si aciertas, aparece una animación de confeti a pantalla completa.
7. Si quieres repetir, pulsas **Otro número** y la vista vuelve arriba automáticamente.

## Características

- Diseño **mobile-first**.
- Adaptado especialmente para **iPhone y pantallas pequeñas**.
- Número mostrado en tamaño muy grande para verse desde lejos.
- Barra inferior fija con selector de tema en formato desplegable.
- Temas visuales: **Festivo**, **Día** y **Noche**.
- Animaciones de cuenta atrás, acierto, fallo y confeti.
- Sin framework pesado ni proceso de build.

## Estructura del proyecto

```text
index.html
script.js
styles.css
README.md
```

## Cómo probarlo en local

No necesita instalación.

1. Abre `index.html` en el navegador.
2. Pulsa **Generar número**.
3. Comprueba la cuenta atrás, el número grande y las animaciones.

## Notas

- El proyecto no usa backend.
- No hay datos persistentes ni almacenamiento local.
- La lógica está pensada para ser ligera y fácil de mantener.

## Licencia

Uso libre.
