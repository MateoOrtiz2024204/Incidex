# Incidex - Backend

API REST del Sistema de Gestión de Incidencias de Fundación Kinal.
Construida con **Node.js + Express + TypeScript** sobre **MySQL** (usa los procedimientos
almacenados definidos en el script de la base de datos), lista para ser consumida por el
frontend en Angular.

## Requisitos

- Node.js 18+
- MySQL 8+ con la base `DBgestionIncidencias_in5cm` ya creada (ejecutar el script `.sql` del proyecto)

## Instalación

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con los datos de tu conexión MySQL:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=DBgestionIncidencias_in5cm
JWT_SECRET=una_clave_secreta
CORS_ORIGIN=http://localhost:4200
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Compilar y ejecutar en producción

```bash
npm run build
npm start
```

## Estructura

```
src/
  app.ts               configuración de Express (cors, json, rutas, manejo de errores)
  index.ts             arranque del servidor y verificación de conexión a BD
  config/db.ts          pool de conexiones MySQL (mysql2/promise)
  types/                interfaces TypeScript de cada entidad
  middlewares/
    auth.middleware.ts   autenticación (JWT) y autorización por rol
    upload.middleware.ts subida de archivos adjuntos (multer)
    error.middleware.ts  manejo centralizado de errores y 404
    asyncHandler.ts       wrapper para controladores async
  controllers/          lógica de cada entidad (llama a los procedimientos almacenados)
  routes/                endpoints agrupados por entidad, montados bajo /api
uploads/incidencias/     archivos adjuntos subidos desde el frontend
```

## Autenticación

`POST /api/auth/login` recibe `{ usuario, contrasena }` (usuario o correo) y responde con
un JWT que debe enviarse en cada petición protegida como:

```
Authorization: Bearer <token>
```

Los roles disponibles (columna `rol_login`) son: `Administrador`, `Profesor`,
`Personal TICS`, `Personal Servicios`, `Personal Infraestructura`.

## Endpoints principales

Todos bajo el prefijo `/api`.

| Recurso        | Rutas                                                              |
|----------------|---------------------------------------------------------------------|
| auth           | `POST /auth/login`, `GET /auth/perfil`                              |
| departamentos  | `GET /` `POST /` `PUT /:id` `DELETE /:id` (mutaciones solo Admin)   |
| categorias     | igual que departamentos                                             |
| ubicaciones    | igual que departamentos                                             |
| prioridades    | igual que departamentos                                             |
| usuarios       | CRUD completo, solo Admin (crea Login + Usuario en una transacción)|
| incidencias    | `GET /` (filtros: estado, categoria, prioridad, ubicacion, usuario, desde, hasta), `GET /:id` (detalle con historial, comentarios, adjuntos y asignaciones), `POST /`, `PUT /:id`, `DELETE /:id` (Admin) |
| asignaciones   | CRUD, mutaciones solo Admin                                          |
| historial      | `GET /` (filtro `id_incidencia`), `DELETE /:id` (Admin)             |
| comentarios    | CRUD abierto a usuarios autenticados                                 |
| adjuntos       | `GET /`, `POST /` (multipart/form-data, campo `archivo`), `DELETE /:id` |

Al cambiar el `estado_incidencia` mediante `PUT /incidencias/:id`, el backend registra
automáticamente el cambio en el historial de la incidencia.

## Notas para el frontend en Angular

- CORS está habilitado para `http://localhost:4200` (configurable con `CORS_ORIGIN`).
- Todas las respuestas siguen el formato `{ ok: boolean, mensaje: string, data?: any }`.
- Los archivos adjuntos se sirven de forma estática en `/uploads/...` según la
  `ruta_archivo` guardada en cada registro.
- Las contraseñas se comparan en texto plano igual que el script de datos de ejemplo
  provisto; antes de producción se recomienda migrar a hashing (bcrypt).
