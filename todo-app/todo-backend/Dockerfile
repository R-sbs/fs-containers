# Use node:24 as the base image
FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD npm start

# NODE_ENV=production tells Node.js libraries and your application to use production settings.

# npm ci --omit=dev installs dependencies needed at runtime, omitting development dependencies.

# COPY --chown=node:node gives the non-root node user ownership of the application files.

# USER node avoids running the application as root.

# EXPOSE 3000 documents the API port.

# CMD ["npm", "start"] starts the application using the start script in package.json.