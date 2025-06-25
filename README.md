# News Challenge Backend

## Ejecución

### Inicio rápido con Docker Compose

```bash
npm run compose:prod
```

### Modo desarrollo

```bash
npm run start:dev
```

### Modo producción

```bash
npm run build
npm run start:prod
```

### Debug

```bash
npm run start:debug
```

### Con Docker

```bash
npm run docker:dev      # Levanta contenedores en modo desarrollo
npm run docker:prod     # Levanta contenedores en modo producción
npm run docker:stop     # Detiene los contenedores
```

## Desafío Técnico

**Backend Javascript - Desafío técnico**

Se pide desarrollar una aplicación de noticias con una arquitectura cliente-servidor. La aplicación debe tener 3 funcionalidades:

1. Mostrar un listado de noticias
2. Mostrar el detalle de una noticia
3. CRUD de noticias

### Tareas previas

- Crear un repositorio de GIT (Gitlab, GitHub o similar) con acceso público para el backend.
- Hacer commits representativos conforme al desarrollo de cada tarea (mínimo un commit por tarea).

### Qué se espera de ti

**Backend**

- Desarrollar una API REST que resuelva los casos de uso mencionados:
  - Listado de noticias
  - Detalle de noticia
  - Creación de noticia
  - Edición de noticia
  - Eliminación de noticia
  - Búsqueda de noticias por nombre y/o autor

- Modelo de datos de noticia con los campos:
  - `title`
  - `body`
  - `image_url` (solo la URL)
  - `author`
  - `date`

- La tecnología de base de datos debe ser PostgreSQL.
- Uso de Docker y Docker Compose.
- Uso de un ORM (preferiblemente TypeORM o Prisma).
- Documentación de la API con Swagger (OpenAPI).

### Se valorará

- Arquitectura de la aplicación y diseño del API según estándares REST.
- Buenas prácticas de desarrollo, patrones de diseño y reusabilidad.
- Uso de linters y formateo de código.
- Testing unitario e integración.
- Preparación del código para producción, escalabilidad y mantenimiento.

### Además se tendrá en cuenta

- Representación de la arquitectura de la aplicación en un diagrama.
- Uso de buenas prácticas de desarrollo, patrones de diseño, reusabilidad, etc.

### Stack recomendado

- Node.js + TypeScript
- NestJS
- PostgreSQL
- Docker y Docker Compose
- TypeORM o Prisma
- Swagger (OpenAPI)

### Entrega

Enviar el desafío completo antes del 26/06/25 a: challenge@mindfactory.ar

## Autor

Desarrollado por **Tomás Ribes**
