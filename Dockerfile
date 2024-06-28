# Usa una imagen base de Node.js para construir la aplicación
FROM node:20 as build-stage

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación Vue para producción
RUN npm run build --prod

# Usa una imagen base de Nginx para servir los archivos estáticos
FROM nginx:stable-alpine as production-stage

# Copia los archivos construidos de la etapa anterior a la carpeta de Nginx
COPY --from=build-stage /app/dist/sell-master/browser /usr/share/nginx/html

# Copia el archivo de configuración de Nginx personalizado (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Inicia Nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]