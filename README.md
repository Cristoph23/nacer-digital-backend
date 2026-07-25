# nacer-digital-backend

API en NestJS que expone el perfil público de un usuario de GitHub, listo para consumirse desde el frontend.

## Instalación

```bash
pnpm install
cp .env.example .env
```

## Ejecución

```bash
pnpm run start:dev    # desarrollo con watch
pnpm run start:prod   # producción (requiere pnpm run build)
```

El servidor escucha en `http://localhost:3000`.

## Variables de entorno

Se cargan desde el archivo `.env` (no versionado). Usá `.env.example` como plantilla.

| Variable | Default | Descripción |
| -------- | ------- | ----------- |
| `PORT` | `3000` | Puerto en el que escucha la API |
| `CORS_ORIGIN` | `http://localhost:3001` | URL del frontend permitida por CORS; admite varias separadas por coma |

```env
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

En producción:

```env
CORS_ORIGIN=https://mi-frontend.com,https://www.mi-frontend.com
```

## Endpoint

### `GET /user/:username`

Devuelve el perfil público del usuario consultado en la API de GitHub.

```bash
curl http://localhost:3000/user/torvalds
```

```json
{
  "id": 1024025,
  "username": "torvalds",
  "name": "Linus Torvalds",
  "bio": null,
  "avatarUrl": "https://avatars.githubusercontent.com/u/1024025?v=4",
  "profileUrl": "https://github.com/torvalds",
  "company": "Linux Foundation",
  "location": "Portland, OR",
  "website": null,
  "email": null,
  "twitterUsername": null,
  "hireable": false,
  "publicRepos": 12,
  "publicGists": 1,
  "followers": 313068,
  "following": 0,
  "createdAt": "2011-09-03T15:26:22Z",
  "updatedAt": "2026-07-21T17:42:26Z"
}
```

### Respuestas de error

| Código | Caso |
| ------ | ---- |
| `400` | El username no cumple el formato válido de GitHub |
| `404` | El usuario no existe en GitHub |
| `429` | Se superó el rate limit de la API pública de GitHub |
| `503` | La API de GitHub no está disponible o respondió de forma inesperada |
| `504` | La API de GitHub no respondió dentro del timeout |

## Estructura

```
src/
├── main.ts
├── app.module.ts
└── user/
    ├── dto/user-profile.dto.ts
    ├── interfaces/github-user.interface.ts
    ├── pipes/github-username.pipe.ts
    ├── user.controller.ts
    ├── user.mapper.ts
    ├── user.module.ts
    └── user.service.ts
```
