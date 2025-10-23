# Proyecto base React + Vite

Este proyecto inicializa una aplicación React utilizando Vite, Tailwind CSS y Material UI. Incluye una página de inicio de sesión lista para consumir un backend configurado mediante una variable de entorno.

## Requisitos previos

- Node.js 18 o superior
- npm 10 o superior

## Configuración inicial

1. Copia el archivo `.env.example` a `.env` y actualiza la URL del backend:

   ```bash
   cp .env.example .env
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

El proyecto quedará disponible en [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev`: ejecuta el servidor de desarrollo con recarga en caliente.
- `npm run build`: genera la compilación optimizada para producción.
- `npm run preview`: sirve la compilación generada para verificación previa al despliegue.

## Estructura destacada

- `src/api`: configuración de Axios y clientes para los endpoints (ej. `authApi`).
- `src/hooks`: hooks personalizados, incluyendo `useLogin`.
- `src/pages`: páginas de la aplicación (ej. `LoginPage`).
- `src/components`: componentes reutilizables como `LoginForm`.
- `src/styles`: estilos globales con Tailwind CSS.

## Flujo de ramas

- La rama activa del proyecto es `dev`. Si necesitas crear otra rama para nuevas funcionalidades, hazlo a partir de `dev`:

  ```bash
  git checkout dev
  git checkout -b feature/nueva-funcionalidad
  ```

- Si aún no tienes la rama localmente porque clonaste el repositorio antes del cambio, renómbrala:

  ```bash
  git branch -m main dev
  ```

- Tras completar tu trabajo, envía los cambios a remoto asegurándote de usar la rama `dev` como base del Pull Request.

## Autenticación

El hook `useLogin` encapsula el flujo de autenticación utilizando `authApi`. Este último consume el `axiosClient`, el cual toma la URL base del backend desde `VITE_API_BASE_URL`.

Ajusta los endpoints y el manejo de respuestas según los requisitos de tu backend.
