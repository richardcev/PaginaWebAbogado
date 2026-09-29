# Gerson Cevallos Apolo

Sitio corporativo estático y multipágina, construido con Astro 7, Tailwind CSS 4 y JavaScript vanilla. No utiliza React, Vue ni bibliotecas de interfaz.

## Ejecutar

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

La vista previa se abre en `http://127.0.0.1:4321/` (o el puerto indicado en la consola).

## Compilar y verificar

```sh
npm run build
node scripts/verify.mjs
npm run preview
```

El resultado publicable está en `dist/`. Puede alojarse en cualquier hosting estático. No necesita un servidor de aplicaciones ni base de datos. La publicación y la configuración del dominio no están realizadas.

## Páginas

- `/`: presentación, estudios, trayectoria, áreas y contacto.
- `/contacto/`: datos y formulario visual.
- `/derecho-administrativo/`
- `/contratacion-publica/`
- `/familia-ninez-adolescencia/`
- `/derecho-constitucional/`
- Página 404, sitemap y robots.txt.

## Mantenimiento

- `src/data/content.ts`: textos y servicios de las cuatro áreas.
- `src/pages/index.astro`: presentación, formación y trayectoria.
- `src/pages/contacto.astro`: contacto y formulario.
- `src/components/`: header, footer, hero, botones, tarjetas, iconos y CTA.
- `src/layouts/Layout.astro`: estructura común y metadatos.
- `src/styles/global.css`: tokens, fuentes, componentes y adaptación responsive; importa Tailwind mediante el plugin oficial de Vite.
- `public/images/` y `public/fonts/`: recursos locales, sin llamadas a servicios externos en la navegación.

El dominio canónico está configurado como `https://gersoncevallos.com` en `astro.config.mjs`. Si se usa otro dominio, actualícelo antes de compilar; sitemap, canonical y Open Graph lo toman de esa configuración.

El formulario es deliberadamente **solo visual**. No tiene endpoint, campos con envío, backend, almacenamiento ni confirmación ficticia. El botón no transmite información y se evita el envío implícito. Para contactar realmente están los enlaces de teléfono, correo y LinkedIn.

El menú permite hover en escritorio, Enter/Space o flecha abajo para abrir, Tab para recorrer enlaces, Escape para cerrar y tap en móvil. Respeta `prefers-reduced-motion`. Las imágenes decorativas tienen `alt` vacío; el retrato y logo tienen texto alternativo.

Los textos profesionales proceden del encargo del titular. Las fotografías arquitectónicas son ilustrativas y no representan una oficina del abogado. Consulte `ASSETS.md` para las fuentes.

`scripts/download-assets.mjs` y `scripts/optimize-assets.mjs` permiten regenerar las imágenes. Ejecútelos en ese orden; la optimización usa Sharp, ya incluido por Astro, sin añadir dependencias. `scripts/import-brief.mjs` es el importador utilizado para conservar los textos originales del encargo; no es necesario ejecutarlo para desarrollar ni compilar.
