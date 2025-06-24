# Usa una imagen liviana de Node.js
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Solo package.json y package-lock.json para cache de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm ci

# Copia el resto del código y build
COPY . .
RUN npm run build

# Expone el puerto de la app y arranca
EXPOSE 3000
CMD ["node", "dist/main.js"]
