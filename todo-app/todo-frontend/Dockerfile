FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# serve production files in dist

FROM nginx:1.29-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

# RUN npm i -g serve

# CMD serve -n dist

# FROM node:24-alpine AS build creates a build environment with Node.js.

# WORKDIR chooses the directory inside the image.

# COPY package*.json ./ copies the dependency manifests first.

# RUN npm ci installs the locked dependencies.

# COPY . . copies the remaining source code.

# RUN npm run build generates the production files, typically in dist/.

# The second FROM starts a fresh, smaller runtime image. It does not include the Node.js build environment.

# COPY --from=build copies only the generated files into Nginx's web directory.

# EXPOSE 80 documents the port used by the frontend container.

# CMD runs Nginx in the foreground so Docker can manage the process.