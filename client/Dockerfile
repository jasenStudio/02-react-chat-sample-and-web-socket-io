# Etapa 1: Construcción
FROM oven/bun:latest as builder

WORKDIR /app

# Copiar los archivos del cliente
COPY . .

# Instalar dependencias y construir la aplicación
RUN bun install
RUN bun run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar los archivos estáticos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
