FROM node:24
WORKDIR /usr/src/app
COPY . .
RUN npm install
# -- --host are the extra parameters needed to expose the dev server to ve visible outside the docker netweo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]