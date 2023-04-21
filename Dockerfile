# Usa una imagen de Node.js como base
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Instala Next.js
RUN npm install next

# Agrega Next.js al PATH
ENV PATH="/app/node_modules/.bin:${PATH}"
ENV DATABASE_URL="mongodb+srv://netflix-clone-admin:netflix-clone-password@netflix-clone.if2la6d.mongodb.net/test"
ENV NEXTAUTH_JWT_SECRET="NEXTAUTH-JWT-SECRET"
ENV NEXTAUTH_SECRET="NEXT-SECRET"

ENV GITHUB_ID=5c1840c9be1d83a0132e
ENV GITHUB_SECRET=a0d72063e8398961873ea2dee297c83f18844ded

ENV GOOGLE_ID=887864557787-0lbvv2ab53ldjaflbinnev0ikctilkbe.apps.googleusercontent.com
ENV GOOGLE_SECRET=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


# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
