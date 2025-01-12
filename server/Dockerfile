# Base de producción con Bun
FROM oven/bun:latest

WORKDIR /app

# Copiar el código del servidor
COPY . .

# Instalar solo las dependencias necesarias
RUN bun install --production

# Exponer el puerto 4000
EXPOSE 4001

# Ejecutar el servidor
CMD ["bun", "run", "start"]
